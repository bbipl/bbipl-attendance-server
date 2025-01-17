const express=require('express');
const router=express.Router();
const submitForm=require('../controllers/forms/formSubmitControllers');
const getAllForms = require('../controllers/formsGetRequirementsFormsControllers');
router.post("/submit-form",submitForm)
router.get("/get-requirements-forms",getAllForms)

module.exports=router;