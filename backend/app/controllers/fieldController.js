const db = require("../models");
const Field = db.fields;

// Create and Save a new Field
exports.create = (req, res) => {
  // Create a Field
  const field = new Field({
    name: req.body.name,
    type: req.body.type
  });

  // Save Field in the database
  field
    .save(field)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Field."
      });
    });
};

// Retrieve all fields from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Field.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fields."
      });
    });
};

// Find a single Field with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Field.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Field with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Field with id=" + id });
    });
};

// Update a Field by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Field.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Field with id=${id}. Maybe Field was not found!`
        });
      } else res.send({ message: "Field was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Field with id=" + id
      });
    });
};

// Delete a Field with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Field.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Field with id=${id}. Maybe Field was not found!`
        });
      } else {
        res.send({
          message: "Field was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Field with id=" + id
      });
    });
};

// Delete all Fields from the database.
exports.deleteAll = (req, res) => {
  Field.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Fields were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Fields."
      });
    });
};
