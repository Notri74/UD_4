module.exports = (sequelize, Sequelize) => {
  const Piloto = sequelize.define("piloto", {
    nombre: {
      type: Sequelize.STRING,
    },
    apellido: {
      type: Sequelize.STRING,
    },
    escuderia: {
      type: Sequelize.STRING,
    },
    numero: {
      type: Sequelize.STRING,
    },
    filename: {
      type: Sequelize.STRING,
    },
  });

  return Piloto;
};
