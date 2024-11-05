const { generarJWT } = require("../helpers/jwt");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

const crearUsuario = async (req, res) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });


        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        };


        user = new User(req.body);

        //Encriptar contraseña

        const salt = bcrypt.genSaltSync(15);
        user.password = bcrypt.hashSync(password, salt);

        await user.save();


        //Generar JWT

        const token = await generarJWT(user.id, user.name);


        res.status(201).json({
            ok: true,
            msg: 'Registro de nuevo usuario',
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {

        //Verificar si el usuario existe
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Verificar el email o password'
            });
        };

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar JWT
        const token = await generarJWT(user.id, user.name);


        res.status(201).json({
            ok: true,
            msg: 'Login de usuario',
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }


};

const revalidarToken = async (req, res) => {

    const { uid, name } = req;

    //Generar JWT
    const token = await generarJWT(uid, name);
    res.json({
        ok: true,
        msg: 'revalidar token',
        token
    });
};


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};