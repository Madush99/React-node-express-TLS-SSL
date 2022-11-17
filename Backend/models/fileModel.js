import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const fileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    file: {
        type: String,
        required: true
    },
    fileSecurityKey : {
        type: String,
        required: true,
        trim: true,
      },
    fileInitVector : {
        type: String,
        required: true, 
        trim: true,
      },
},{
    timestamps: true
})

// messageSchema.methods.matchPassword = async function(enterMessage) {
//     return await bcrypt.compare(enterMessage, this.message)
// }

// messageSchema.pre('save', async function(next){
//     if(!this.isModified('message')){
//         next()
//     }

//     const salt = await bcrypt.genSalt(10)
//     this.message = await bcrypt.hash(this.message, salt)
// })

const File = mongoose.model('File', fileSchema);

export default File;