const campaignContoller = require("../controllers/campaignController");
const validateDto = require('../middleware/validate-dto');
const campaignSchema = require('../schema/campaign');

module.exports = app => {

  var router = require("express").Router();

  // Create a new campaign
  router.post("/", validateDto(campaignSchema), campaignContoller.create);

  // Retrieve all campaigns
  router.get("/", campaignContoller.findAll);

  router.get("/:id", campaignContoller.findOne);

  // Delete a campaign with id
  router.delete("/:id", campaignContoller.delete);

  app.use("/api/campaigns", router);
};
