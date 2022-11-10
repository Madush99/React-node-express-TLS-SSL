import express from "express"
import https  from "https"
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
//import cors from 'cors'
import colors from 'colors'


//routes
import userRoutes from './routes/userRoutes.js'
import mesgRoutes from './routes/messageRoutes.js'
import fileRoutes from './routes/fileRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app.use('/',( req, res, next) => {
//     res.send('hello from ssl server');
// }) 


if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//app.use(cors())
app.use(express.json())

//calling Routes
const __dirname1 = path.resolve()
app.use('/uploads', express.static(path.join(__dirname1, '/uploads')))
app.use('/api/uploads', uploadRoutes)
app.use('/api/users', userRoutes);
app.use('/api/msg', mesgRoutes);
app.use('/api/uploadfile', fileRoutes);


const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app);

sslServer.listen(4000, () => console.log('Secure server 🚀 🔑 on port 4000'.yellow.bold))