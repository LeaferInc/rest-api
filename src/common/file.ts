import { BadRequestException } from "@nestjs/common";

/**
 * File object from nestjs `UploadedFile`
 */
export class File {
    buffer: Buffer;
    destination?: string;
    encoding: string;
    fieldname: string;
    filename?: string;
    mimetype: string;
    originalname: string;
    path?: string;
    size: number;
}

const allowedExtensions = ['png', 'jpg', 'jpeg'];

export function fileFilter(req: Request, file: File, cb) {
    const extension = file.originalname.split('.').pop().toLowerCase();
    if (allowedExtensions.includes(extension)) {
        return cb(null, true);
    }
    return cb(new BadRequestException('Incorrect file type'), false);
}