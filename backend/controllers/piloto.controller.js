const db = require("../models");
const Piloto = db.pilotos;
const Op = db.sequelize.Op;

// Create and Save a new Piloto
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Piloto
  const piloto = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    escuderia: req.body.escuderia,
    numero: req.body.numero,
    filename: req.file ? req.file.filename : "",
  };

  // Save Piloto in the database
  Piloto.create(piloto)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Piloto.",
      });
    });
};

// Retrieve all Pilotos from database
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Piloto.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Piloto with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Piloto.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

// Update a Piloto by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Piloto.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Piloto was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Piloto with id=${id}. Maybe Piloto was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Piloto with id=" + id,
      });
    });
};

// Delete a Piloto whith the specifyed id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Piloto.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Piloto was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Piloto with id=${id}. Maybe Piloto was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Piloto with id=" + id,
      });
    });
};
