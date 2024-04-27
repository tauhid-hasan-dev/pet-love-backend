import multer from "multer"
import path from "path"
import fs from 'fs'

import {v2 as cloudinary} from 'cloudinary';
import { ICloudinaryResponse, IFile } from "../interfaces/file";
import config from "../config";

// you will get this config from the cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })


// we just upgraded code that we got from cloudinary to handle promises(error or success)
const uploadToCloudinary = async (file: IFile): Promise<ICloudinaryResponse | undefined> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path,
            (error: Error, result: ICloudinaryResponse) => {
                fs.unlinkSync(file.path) // to delete the uploaded file from local 'upload directory'
                if (error) {
                    reject(error)
                }
                else {
                    resolve(result)
                }
            })
    })
};


export const fileUploader = {
    upload,
    uploadToCloudinary
}