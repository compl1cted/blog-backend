import { readFile, writeFile } from 'fs/promises';
import { v4 } from "uuid"
import { resolve } from "path"

export class FileService {
    async Create(file: any) {
        try {
            const filename = v4() + file.type;
            const filepath = resolve('files', filename);
            await writeFile(filepath, file);
        }
        catch (error) {
            console.error(error);
        }
    }

    async Get(filepath: string) {
        try {

        }
        catch (error) {
            console.error(error);
        }
    }

    async GetAll() {
        try {

        }
        catch (error) {
            console.error(error);
        }
    }

    async Update(filepath: string) {
        try {

        }
        catch (error) {
            console.error(error);
        }
    }

    async Delete(filepath: string) {
        try {

        }
        catch (error) {
            console.error(error);
        }
    }
}