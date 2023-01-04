const fieldController = require("../controllers/fieldController");
const validateDto = require('../middleware/validate-dto');
const fieldSchema = require('../schema/field');

module.exports = app => {

  var router = require("express").Router();

  // Create a new Field
  router.post("/", validateDto(fieldSchema), fieldController.create);

  // Retrieve all fields
  router.get("/", fieldController.findAll);

  // Retrieve all fields related to a user
  router.get("/:id", fieldController.findOne);

  // Update a field with id
  router.put("/:id", fieldController.update);

  // Delete a field with id
  router.delete("/:id", fieldController.delete);

  // Delete all fields
  router.delete("/", fieldController.deleteAll);

  app.use("/api/fields", router);
};
