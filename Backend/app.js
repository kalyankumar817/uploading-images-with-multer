require('dotenv').config();
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const uploadRoute=require('./routes/uploadRoute')

const app=express();

const port=process.env.PORT
const mongouri=process.env.MONGODB_URI

// MongoDB connection
mongoose.connect(mongouri)
    .then(() => console.log('Connection established successfully'))
    .catch((err) => console.log('Error in establishing connection:', err));

app.use(express.json());
app.use(cors());

app.use('/images',uploadRoute)

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})
