
const express=require("express");
const addStateNameControllers=require("../controllers/sitesManagement/states/addStateNameControllers.js");
const findSitesDetails = require("../controllers/sitesManagement/findSiteDetails");
const updateStateNameController = require("../controllers/sitesManagement/states/updateStateNameControllers.js");
const deleteStateNameController = require("../controllers/sitesManagement/states/deleteStateNameControllers.js");

//districts
const addDistrictNameControllers=require("../controllers/sitesManagement/districts/addDistrictNameControllers.js");
const updateDistrictNameController = require("../controllers/sitesManagement/districts/updateDistrictNameControllers.js");
const deleteDistrictNameController = require("../controllers/sitesManagement/districts/deleteDistrictNameControllers.js");
// const addSiteDetailsControllers = require("../controllers/sitesManagement/addSiteDetailsControllers");
// const { updateContactUsMessages } = require("../controllers/updateContactUsMessages");
// const addSiteNameControllers = require("../controllers/sitesManagement/addSiteNameControllers");
const router=express.Router();

// const addSiteDetails

//routes to create
router.post("/add-state-name",addStateNameControllers);
router.post("/add-district-name",addDistrictNameControllers);
// router.post("add-site-details",addSiteDetailsControllers);
// router.post("add-site-name",addSiteNameControllers);
// router.post("add-location-name",addSiteNameControllers);
// router.post("update-site-details",updateContactUsMessages);
//routes to update
router.put("/update-state-name",updateStateNameController);
router.put("/update-district-name",updateDistrictNameController);
//routes to delete
router.delete("/delete-state-name",deleteStateNameController)
router.delete("/delete-district-name",deleteDistrictNameController)
//routes to find
router.get("/find-site-details",findSitesDetails);

module.exports=router
