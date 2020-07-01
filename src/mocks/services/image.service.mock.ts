import { File } from "src/common/file";
import { ImageType, ImageService } from "src/image/image.service";

export class ImageServiceMock {
    static fs = new Map<string, File>();

    static file: File = new File();

    static setup(): void {
        ImageServiceMock.file.fieldname = 'file';
        ImageServiceMock.file.originalname = 'file_test.png';
        ImageServiceMock.file.encoding = '7bit';
        ImageServiceMock.file.mimetype = 'image/jpeg';
        ImageServiceMock.file.buffer = new Buffer('Image');

        const mockReadFile = jest.fn((imageType: ImageType, filename: string) => ImageServiceMock.fs.get(filename).buffer.toString('base64'));
        ImageService.readFile = mockReadFile;
    }

    static mock = {
        saveFile: jest.fn((imageType: ImageType, filename: string, file: File) => {
            const fullname = filename + '.' + file.originalname.split('.').pop();
            ImageServiceMock.fs.set(fullname, file);
            return fullname;
        }),
        deleteFile: jest.fn((imageType: ImageType, filename: string) => {
            ImageServiceMock.fs.delete(filename);
        }),
    };
}