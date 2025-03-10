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

const getUserById = async (req, res) => {
    try {
        const user = await userUseCases.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userUseCases.updateUser(req.params.id, req.body);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el usuario' });
    }
};

const deleteUser = async (req, res) => {
    try {
        await userUseCases.deleteUser(req.params.id);
        res.status(200).json({ success: true, message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el usuario' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};