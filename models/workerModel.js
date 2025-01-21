const mongoose=require('mongoose')

const workerSchema=new mongoose.Schema({
    workerName:{
        type:String,
        trim:true,
        required:true,

    },
    workerMobile:{
        type:String,
        trim:true,
        required:true,

    },
    workerAadhaar:{
        type:String,
        trim:true,
        

    },
    workerPanCard:{
        type:String,
        trim:true,
        

    },
    workerAccountDetails:{
        type:String,
        trim:true,
        

    },
});
const workerModel=mongoose.model("Worker",workerSchema);
module.exports=workerModel