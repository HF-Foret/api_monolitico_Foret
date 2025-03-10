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

module.exports = {
    createUser,
    getAllUsers,
};