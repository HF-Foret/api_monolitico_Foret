const userUseCases = require('../useCases/userUseCases');

const createUser = async (req, res) => {
    try {
        const user = await userUseCases.createUser(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el usuario' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userUseCases.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
};