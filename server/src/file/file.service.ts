import { Injectable } from '@nestjs/common';
import { bucket } from 'src/shared/database/firebase/firebase.config';

export enum fileType {
  userAvatar = 'userAvatar',
}
@Injectable()
export class FileService {
  async createFile(file: Express.Multer.File, type: fileType) {
    const remoteFilePath = `${type}/${crypto.randomUUID()}.png`;
    if (file.buffer) {
      await bucket.file(remoteFilePath).save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
        contentType: file.mimetype,
      });
    } else {
      throw new Error('File upload error: No file data found.');
    }
    await bucket.file(remoteFilePath).makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${remoteFilePath}`;
    return publicUrl;
  }
}
