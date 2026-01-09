import SftpClient from "ssh2-sftp-client";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

export class SftpService {
  private sftp = new SftpClient();

  async connect() {
    await this.sftp.connect({
      host: process.env.SFTP_HOSTNAME,
      port: Number(process.env.SFTP_PORT),
      username: process.env.SFTP_USERNAME,
      password: process.env.SFTP_PASSWORD,
      privateKey: fs.readFileSync("/root/.ssh/sftp_proxy_key"),
    });
  }

  async upload(localFilePath: string, remoteFilePath: string) {
    await this.sftp.put(localFilePath, remoteFilePath);
  }

  async download(remoteFilePath: string, localFilePath: string) {
    await this.sftp.get(remoteFilePath, localFilePath);
  }

  async disconnect() {
    await this.sftp.end();
  }
}
