import { ImageType, ImageService } from "src/image/image.service";

export class ImageServiceMock {
    static fs = new Map<string, Buffer>();
    static file;

    static setup(): void {
        ImageServiceMock.file = Buffer.from('Image', 'base64');

        const mockReadFile = jest.fn((imageType: ImageType, filename: string) => ImageServiceMock.fs.get(filename).toString('base64'));
        ImageService.readFile = mockReadFile;

        const mockSaveFile = jest.fn((imageType: ImageType, filename: string, base64: string) => {
            const fullname = filename + '.png';
            ImageServiceMock.fs.set(fullname, Buffer.from(base64, 'base64'));
            return fullname;
        });
        ImageService.saveFile = mockSaveFile;
    }

    static mock = {
        deleteFile: jest.fn((imageType: ImageType, filename: string) => {
            ImageServiceMock.fs.delete(filename);
        }),
    };
}