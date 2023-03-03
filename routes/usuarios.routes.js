const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  esRoleValudo,
  existeEmail,
  existeUsuarioPorID,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios.controllers");

const router = Router();

router.get("/", usuariosGet);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio y tener más de 6 letras"
    ).isLength({ min: 6 }),
    check("correo", "El formato de correo no es valido").isEmail(),
    check("correo").custom(existeEmail),
    // check("rol", "No es un rol permitido").isIn(['ADMIN_ROL', 'USER_ROL']),
    //check('rol').custom((rol) => esRoleValudo(rol)),
    check("rol").custom(esRoleValudo),
    validarCampos,
  ],
  usuariosPost
);
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    check("rol").custom(esRoleValudo),
    validarCampos,
  ],
  usuariosPut
);
router.put("/", usuariosPatch);
router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;

//640279e6eb9319bd3e256372
