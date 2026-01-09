import { Request, Response } from "express";
import express from "express";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import { SftpService } from "./sftp.service";

dotenv.config();

const app = express();

const upload = multer({
  dest: "uploads/",
});

app.use(express.json());

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

app.get("/", async (req, res) => {
  const sftp = new SftpService();

  try {
    await sftp.connect();
    res.send({ message: "Connection Stablished!" });
  } catch (e) {
    console.log(e);
  } finally {
    await sftp.disconnect();
  }
});

app.post(
  "/upload",
  upload.single("file"),
  async (req: MulterRequest, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const localFilePath = req.file.path;
    const remoteFilePath = path.posix.join(
      "/remote/path",
      req.file.originalname
    );

    // try {
    //   await sftp.connect({
    //     host: process.env.SFTP_HOST as string,
    //     port: Number(process.env.SFTP_PORT) || 22,
    //     username: process.env.SFTP_USER as string,
    //     password: process.env.SFTP_PASSWORD,
    //     // privateKey: fs.readFileSync(process.env.SFTP_PRIVATE_KEY_PATH!)
    //   });

    //   await sftp.put(localFilePath, remoteFilePath);

    //   return res.json({
    //     message: "File uploaded successfully",
    //     file: req.file.originalname,
    //   });
    // } catch (e) {
    //   console.error("SFTP upload error:", e);
    //   return res.status(500).json({ error: "SFTP upload failed" });
    // } finally {
    //   fs.unlink(localFilePath, () => {});
    //   sftp.end();
    // }
    res.send({ localFilePath, remoteFilePath });
  }
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
