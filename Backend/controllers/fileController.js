import asyncHandler from 'express-async-handler';
import File from '../models/fileModel.js'
import crypto from 'crypto'
const algorithm = "aes-256-cbc";

const uploadFile = asyncHandler(async (req, res) => {
    const initVector = crypto.randomBytes(16);
    const Securitykey = crypto.randomBytes(32);
    const {file} = req.body
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

    let encryptedData = cipher.update(file, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    const base64Securitykey = Buffer.from(Securitykey, 'binary').toString('base64');

    const base64InitVector = Buffer.from(initVector, 'binary').toString('base64');
    const fileUpload = new File({
        file: encryptedData,
        user: req.user._id,
        fileSecurityKey: base64Securitykey,
        fileInitVector: base64InitVector,
    })

    const uploadFile = await fileUpload.save()

    res.status(201).json(uploadFile);
})

export {uploadFile}