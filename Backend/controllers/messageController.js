import asyncHandler from 'express-async-handler';
import Message from '../models/messageModel.js';
import crypto from 'crypto'
const algorithm = "aes-256-cbc";

const sendMessage = asyncHandler(async (req, res) => {


    const initVector = crypto.randomBytes(16);
    const Securitykey = crypto.randomBytes(32);
    const { message } = req.body
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

    let encryptedData = cipher.update(message, "utf-8", "hex");

    encryptedData += cipher.final("hex");

    const base64Securitykey = Buffer.from(Securitykey, 'binary').toString('base64');
    // convert the initialization vector to base64 string
    const base64InitVector = Buffer.from(initVector, 'binary').toString('base64');
    const mesg = new Message({
        message: encryptedData,
        messageSecurityKey: base64Securitykey,
        messageInitVector: base64InitVector,
        user: req.user._id
    })

    const createMsg = await mesg.save()
    console.log("Encrypted message: " + encryptedData);
    console.log("InitVector", initVector);
    console.log("Security Key", Securitykey)
    res.status(201).json(createMsg);
})

export { sendMessage }