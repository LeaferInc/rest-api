/**
 * @author ddaninthe
 */

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { File } from 'src/common/file';

@Injectable()
export class ImageService {
    private static BASE_FOLDER = 'pictures';
    private static AVATAR_FOLDER = 'avatars';

    /**
     * Creates all needed folders
     */
    constructor() {
        this.createSubDir(ImageService.AVATAR_FOLDER);
    }

    /**
     * Create a directory to store pictures
     * @param subdir the name of the directory
     */
    private createSubDir(subdir: string) : void {
        fs.mkdir(path.join(__dirname, ImageService.BASE_FOLDER, subdir), { recursive: true }, (err: NodeJS.ErrnoException) => {
            if (err && err.code !== 'EEXIST') {
                console.log(err);
            }
        });
    }

    /**
     * Saves a user's avatar
     * @param picture the picture to save
     * @param username the username of the sender
     */
    saveAvatar(picture: File, username: string): void {
        const filename: string = username + '.' + picture.originalname.split('.').pop();
        this.saveFile(path.join(ImageService.AVATAR_FOLDER, filename), picture);
    }

    /**
     * Stores a file in the file system
     * @param path the path to store the file
     * @param file the file to store
     */
    private saveFile(filename: string, file: File): void {
        const fullPath = path.join(__dirname, ImageService.BASE_FOLDER, filename);
        console.log(file);
        fs.writeFileSync(fullPath, file.buffer);
    }
}
