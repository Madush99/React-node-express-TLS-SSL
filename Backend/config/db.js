import mongoose from 'mongoose'

const connectDB = async () =>{
    //database connection
    try{
        let database = process.env.MONGO_URI;
        if (process.env.NODE_ENV === "testing") {
            database = process.env.MONGO_URI;
          }
          
        const conn = await mongoose.connect(database, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
           // useCreateIndex: true
        })
        //database connected alert
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    }catch (error){
        console.error(`Error: ${error.message}`.red.underline.bold) //database not connected message
        process.exit(1)
    }
}

export default connectDB  //exporting database