import { Request, Response } from "express";
import formidable from 'formidable';

import { GoogleDriveService } from '../helpers/googleDrive';
import * as dotenv from "dotenv";
dotenv.config();

export const addImage = (req: Request, res: Response) => {
    const form: any = new formidable.IncomingForm();
    form.uploadDir = "./";
    form.keepExtensions = true;
    const image = form.parse(req, (err, fields, files) => {
        return fields.image
    });
    const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
    const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
    const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI;
    const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;
    (async () => {
        const googleDriveService = new GoogleDriveService(
            driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken
        );
        const folderName = 'Picture';
        let folder = await googleDriveService.searchFolder(folderName).catch((error) => {
            console.error(error);
            return null;
        });

        if (!folder) {
            folder = await googleDriveService.createFolder(folderName);
        }

        await googleDriveService.saveFile('SpaceX', image, 'image/jpg', folder.id).then(res => {
            console.log(res.data.id, "url = ", `https://drive.google.com/uc?id=${res.data.id}`)
        }).catch((error) => {
            console.error(error);
        });

        console.info('File uploaded successfully!');

    })();
}
