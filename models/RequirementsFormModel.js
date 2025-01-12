const mongoose=require('mongoose');
const requirementsFormSchema=new mongoose.Schema({
    empName:{
        type:String,
        required:true,
    },
    empId:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    siteName:{
        type:String,
        required:true,
    },
    dateOfRequirement:{
        type:String,
        required:true,
    },
    requirementType:{
        type:String,
        required:true,
    },
    remarks:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const requirementsFormModel=mongoose.model("requirementsFormModel",requirementsFormSchema);
module.exports=requirementsFormModel;