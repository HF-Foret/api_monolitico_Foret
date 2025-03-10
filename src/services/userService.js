const { getConnection } = require('../utils/db');
const sql = require('mssql');
const bcrypt = require('bcrypt');

const createUser = async (userData) => {
    try {
        const pool = await getConnection();
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const result = await pool.request()
            .input('email', sql.VarChar(50), userData.email)
            .input('password', sql.VarChar(sql.MAX), hashedPassword)
            .input('name', sql.VarChar(30), userData.name)
            .input('lastName', sql.VarChar(50), userData.lastName)
            .input('phone', sql.VarChar(20), userData.phone)
            .query(`
                INSERT INTO users (email, password, name, lastName, phone, created_at, updated_at)
                VALUES (@email, @password, @name, @lastName, @phone, GETDATE(), GETDATE());
                SELECT SCOPE_IDENTITY() AS id;
            `);

        return result.recordset[0]; 
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw new Error('Error al registrar el usuario');
    }
};

const getAllUsers = async () => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM users");
        return result.recordset;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw new Error('Error al obtener la lista de usuarios');
    }
};

module.exports = {
    createUser,
    getAllUsers,
};