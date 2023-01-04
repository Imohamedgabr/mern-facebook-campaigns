const userContoller = require("../controllers/userContoller");
const validateDto = require('../middleware/validate-dto');
const userSchema = require('../schema/user');

module.exports = app => {

  var router = require("express").Router();

  // Create a new user
  router.post("/", validateDto(userSchema), userContoller.create);

  // Retrieve all users
  router.get("/", userContoller.findAll);

  // Retrieve all users related to a user
  router.get("/:id", userContoller.findOne);

  app.use("/api/users", router);
};
