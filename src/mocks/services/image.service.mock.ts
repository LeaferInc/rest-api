import { File } from "src/common/file";
import { ImageType } from "src/image/image.service";

export class ImageServiceMock {
    static fs = new Map<string, File>();

    static file: File = new File();

    static setup(): void {
        ImageServiceMock.file.fieldname = 'file';
        ImageServiceMock.file.originalname = 'file_test.png';
        ImageServiceMock.file.encoding = '7bit';
        ImageServiceMock.file.mimetype = 'image/jpeg';
        ImageServiceMock.file.buffer = new Buffer('Image');
    }

    saveFile(imageType: ImageType, filename: string, file: File): string {
        const fullname = filename + '.' + file.originalname.split('.').pop();
        ImageServiceMock.fs.set(fullname, file);
        return fullname;
    }
}