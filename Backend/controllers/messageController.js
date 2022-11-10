import asyncHandler from 'express-async-handler';
import Message from '../models/messageModel.js';

const sendMessage = asyncHandler(async (req, res) => {
    const {message} = req.body

    const mesg = new Message({
        message,
        user: req.user._id
    })

    const createMsg = await mesg.save()

    res.status(201).json(createMsg);
})

export {sendMessage}