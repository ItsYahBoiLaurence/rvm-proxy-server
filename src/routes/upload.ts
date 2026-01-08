// import { Router, Request, Response } from "express";
// import multer from "multer";
// import SftpClient from "ssh2-sftp-client";
// import fs from "fs";
// import path from "path";

// const router = Router();

// const upload = multer({
//   dest: "uploads/",
// });

// interface MulterRequest extends Request {
//   file?: Express.Multer.File;
// }

// router.post(
//   "/upload",
//   upload.single("file"),
//   async (req: MulterRequest, res: Response) => {
//     // const sftp = new SftpClient();

//     if (!req.file) {
//       return res.status(400).json({ error: "File is required" });
//     }

//     const localFilePath = req.file.path;
//     const remoteFilePath = path.posix.join(
//       "/remote/path",
//       req.file.originalname
//     );

//     return {
//       localFilePath,
//       remoteFilePath,
//     };
//     // try {
//     //   await sftp.connect({
//     //     host: process.env.SFTP_HOST as string,
//     //     port: Number(process.env.SFTP_PORT) || 22,
//     //     username: process.env.SFTP_USER as string,
//     //     password: process.env.SFTP_PASSWORD,
//     //     // privateKey: fs.readFileSync(process.env.SFTP_PRIVATE_KEY_PATH!)
//     //   });

//     //   await sftp.put(localFilePath, remoteFilePath);

//     //   return res.json({
//     //     message: "File uploaded successfully",
//     //     file: req.file.originalname,
//     //   });
//     // } catch (error) {
//     //   console.error("SFTP upload error:", error);
//     //   return res.status(500).json({ error: "SFTP upload failed" });
//     // } finally {
//     //   fs.unlink(localFilePath, () => {});
//     //   sftp.end();
//     // }
//   }
// );

// export default router;
