const userRepository = require('../repositories/userRepository');
const { hashData } = require('../utils/hashData');

const createUser = async (userData) => {
    const hashedPassword = await hashData(userData.password);
    const user = {
        ...userData,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    return await userRepository.createUser(user);
};

const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};

const getUserById = async (id) => {
    return await userRepository.getUserById(id);
};

const updateUser = async (id, userData) => {
    const user = {
        ...userData,
        updatedAt: new Date()
    };
    return await userRepository.updateUser(id, user);
};

const deleteUser = async (id) => {
    return await userRepository.deleteUser(id);
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};