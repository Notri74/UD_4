module.exports = (app) => {
  const pilotos = require("../controllers/piloto.controller");
  var upload = require("../multer/upload");

  var router = require("express").Router();

  // Create a new Piloto
  router.post("/", upload.single("file"), pilotos.create);

  // Retrieve all Pilotos
  router.get("/", pilotos.findAll);

  // Retrieve a single Pilotos with id
  router.get("/:id", pilotos.findOne);

  // Update a Pilotos with id
  router.put("/:id", pilotos.update);

  // Delete a pilotos with id
  router.delete("/:id", pilotos.delete);

  app.use("/api/pilotos", router);
};
