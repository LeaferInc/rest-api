/**
 * This class represents an uploaded file
 */
export class File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

// Allowed extensions
const allowedFiles = ['jpg', 'jpeg', 'png', 'bmp'];

// Filters files
export function fileFilter(req, file: File, cb) {
    const extension = file.originalname.split('.').pop().toLowerCase();

    cb(null, allowedFiles.includes(extension))
}