const mongoose=require('mongoose')

const uploadSchema=new mongoose.Schema({
    image:{
        type:Buffer,
        required:true
    }
})
module.exports=mongoose.model('Image',uploadSchema)