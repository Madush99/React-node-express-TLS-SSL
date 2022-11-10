import asyncHandler from 'express-async-handler';
import File from '../models/fileModel.js'

const uploadFile = asyncHandler(async (req, res) => {
    const {file} = req.body

    const fileUpload = new File({
        file,
        user: req.user._id
    })

    const uploadFile = await fileUpload.save()

    res.status(201).json(uploadFile);
})

export {uploadFile}