const mongoose=require('mongoose');
const requirementsFormSchema=new mongoose.Schema({
    empName:{
        type:String,
        required:true,
        trim:true,
    },
    empId:{
        type:String,
        required:true,
        trim:true,
    },
    date:{
        type:String,
        required:true,
        trim:true,
    },
    siteName:{
        type:String,
        required:true,
        trim:true,
    },
    dateOfRequirement:{
        type:String,
        required:true,
        trim:true,
    },
    requirementType:{
        type:String,
        required:true,
        trim:true,
    },
    remarks:{
        type:String,
        required:true,
        trim:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const requirementsFormModel=mongoose.model("requirementsFormModel",requirementsFormSchema);
module.exports=requirementsFormModel;