/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
 */
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { validarJwt } = require('../middlewares/validarJwt');

// Ruta para crear un nuevo usuario
router.post('/new', [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe ser de 6 caracteres').isLength({ min: 6 }),
    fieldValidator
], crearUsuario);

// Ruta para autenticar un usuario
router.post('/', [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password debe ser de 6 caracteres').isLength({ min: 6 }),
    fieldValidator
], loginUsuario);

// Ruta para revalidar token
router.get('/renew', validarJwt, revalidarToken);

module.exports = router;