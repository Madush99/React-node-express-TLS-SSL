import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const messageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

// messageSchema.methods.matchPassword = async function(enterMessage) {
//     return await bcrypt.compare(enterMessage, this.message)
// }

messageSchema.pre('save', async function(next){
    if(!this.isModified('message')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.message = await bcrypt.hash(this.message, salt)
})

const Message = mongoose.model('Message', messageSchema);

export default Message;