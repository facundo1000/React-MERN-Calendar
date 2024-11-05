const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJwt = (req, res = response, next) => {

    const header = req.header('x-token');

    if (!header) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    };

    try {

        const { uid, name } = jwt.verify(header, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });

    }
    next();
};


module.exports = {
    validarJwt
};