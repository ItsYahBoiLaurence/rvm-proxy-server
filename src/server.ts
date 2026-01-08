import { Request, Response } from "express";
import express from "express";
import multer from "multer";
import path from "path";

const app = express();

const upload = multer({
  dest: "uploads/",
});

app.use(express.json());

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

app.get("/", (req, res) => {
  res.send("hello");
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

    return res.send({
      localFilePath,
      remoteFilePath,
    });
  }
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
