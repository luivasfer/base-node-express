const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValudo = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El Rol ${rol} no esta registrado en la BD`);
  }
};

const existeEmail = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo}, ya esta registrado`)
  }
};

const existeUsuarioPorID = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe: ${id},`)
  }
};

module.exports = {
  esRoleValudo,
  existeEmail,
  existeUsuarioPorID
};
