const { Router } = require("express");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarJwt } = require("../middlewares/validarJwt");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/fieldValidator");
const { isDate } = require("../helpers/isDate");

const router = Router();

router.use(validarJwt);

router.get("/", getEventos);


router.post("/", [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de fin es obligatoria').custom(isDate),
    fieldValidator
], crearEvento);

router.put("/:id", actualizarEvento);

router.delete("/:id", eliminarEvento);

module.exports = router;