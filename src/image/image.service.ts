/**
 * @author ddaninthe
 */

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

// Types of images to store
export enum ImageType {
  AVATAR,
  BEST_PLANT,
  CUTTING,
  EVENT,
  PLANT,
}

@Injectable()
export class ImageService {
  // Base images folder
  private static BASE_DIRECTORY = 'pictures';

  // Images subdirectories
  private static folderMap: Map<ImageType, string> = new Map([
    [ImageType.AVATAR, 'avatars'],
    [ImageType.BEST_PLANT, '../../../assets/best-plant'],
    [ImageType.CUTTING, 'cuttings'],
    [ImageType.EVENT, 'events'],
    [ImageType.PLANT, 'plants'],
  ]);

  /**
   * Creates all needed folders
   */
  constructor() {
    for (const key of ImageService.folderMap.keys()) {
      ImageService.createSubDir(ImageService.folderMap.get(key));
    }
  }

  /**
   * Creates a directory
   * @param subdir the name of the directory
   */
  static createSubDir(subdir: string): void {
    fs.mkdir(path.join(__dirname, ImageService.BASE_DIRECTORY, subdir), { recursive: true }, (err: NodeJS.ErrnoException) => {
      // Ignore "already created folder" error
      if (err && err.code !== 'EEXIST') {
        console.log(err);
      }
    });
  }

  /**
   * Returns the fullPath of a file
   * @param imageType the type of the image
   * @param filename the filename
   */
  static getPath(imageType: ImageType, filename: string): string {
    return path.join(__dirname, ImageService.BASE_DIRECTORY, ImageService.folderMap.get(imageType), filename);
  }

  /**
   * Deletes a file
   * @param imageType the type of image to delete
   * @param filename the name of the file
   */
  deleteFile(imageType: ImageType, filename: string): void {
    const filepath = ImageService.getPath(imageType, filename);
    fs.unlink(filepath, () => {
      console.log(`Deleted File: ${filepath}`);
    });
  }

  /**
   * Stores a file in the file system
   * @param imageType the type of file to save
   * @param filename the file name (without extension)
   * @param file the file to store
   */
  static saveFile(imageType: ImageType, filename: string, base64: string): string {
    const fullname: string = filename + '.png';

    const fullPath = ImageService.getPath(imageType, fullname);
    const buffer: Buffer = Buffer.from(base64, 'base64');

    fs.writeFile(fullPath, buffer, () => {
      console.log(`Saved File: ${fullPath}`);
    });

    return fullname;
  }

  /**
   * Returns a file from the fs as base64 encoded string
   * @param imageType the type of file to read
   * @param filename the filename to read
   */
  static readFile(imageType: ImageType, filename: string): string {
    if (!filename) return null;

    const fullPath = ImageService.getPath(imageType, filename);
    let file: Buffer = null;
    try {
      file = fs.readFileSync(fullPath);
    } catch (_) { }

    if (!file) return null;

    return file.toString('base64');
  }
}
