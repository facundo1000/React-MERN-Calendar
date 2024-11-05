const Event = require("../models/Event");

const getEventos = async (req, res) => {

    const eventos = await Event.find().populate('user', 'name');

    res.status(200).json({
        ok: true,
        eventos: eventos,
    });
};


const crearEvento = async (req, res) => {

    const evento = new Event(req.body);

    try {
        evento.user = req.uid;
        const eventoDB = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });

    }
};

const actualizarEvento = async (req, res) => {

    const { id } = req.params;
    const uid = req.uid;

    try {
        const evento = await Event.findById(id);

        // Verificar si el evento existe
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe por ese id",
            });
        };

        // Verificar si el evento pertenece al usuario
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegio de editar este evento",
            });
        };

        const nuevoEvento = {
            ...req.body,
            user: uid,
        };

        const updatedEvent = await Event.findByIdAndUpdate(id, nuevoEvento, { new: true });

        res.status(200).json({
            ok: true,
            event: updatedEvent,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });

    }
};

const eliminarEvento = async (req, res) => {
    const { id } = req.params;

    const uid = req.uid;

    try {
        const evento = await Event.findById(id);

        // Verificar si el evento existe
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe por ese id",
            });
        };

        // Verificar si el evento pertenece al usuario
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegio de eliminar este evento",
            });
        };

        const nuevoEvento = {
            ...req.body,
            active: false,
            user: uid,
        };

        await Event.findByIdAndUpdate(id, nuevoEvento, { new: true });

        res.status(204).json({
            ok: true,
            msg: "eliminarEvento",
        });

        console.log(`Evento eliminado: ${id}`);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });

    }
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
};