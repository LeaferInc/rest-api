/**
 * @author ddaninthe
 */

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { File } from 'src/common/file';

// Types of images to store
export enum ImageType {
    AVATAR,
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
        [ImageType.CUTTING, 'cuttings'],
        [ImageType.EVENT, 'events'],
        [ImageType.PLANT, 'plants'],
    ]);

    /**
     * Creates all needed folders
     */
    constructor() {
        for (const key of ImageService.folderMap.keys()) {
            this.createSubDir(ImageService.folderMap.get(key));
        }
    }

    /**
     * Creates a directory
     * @param subdir the name of the directory
     */
    private createSubDir(subdir: string): void {
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
    getPath(imageType: ImageType, filename: string): string {
        return path.join(__dirname, ImageService.BASE_DIRECTORY, ImageService.folderMap.get(imageType), filename);
    }

    /**
     * Deletes a file
     * @param imageType the type of image to delete
     * @param filename the name of the file
     */
    deleteFile(imageType: ImageType, filename: string): void {
        const filepath = this.getPath(imageType, filename);
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
    saveFile(imageType: ImageType, filename: string, file: File): string {
        const fullname: string = filename + '.' + file.originalname.split('.').pop();

        const fullPath = this.getPath(imageType, fullname);
        fs.writeFile(fullPath, file.buffer, () => {
            console.log(`Saved File: ${fullPath}`);
        });

        return fullname;
    }
}
