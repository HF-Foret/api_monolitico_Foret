const { getConnection } = require('../utils/db');
const sql = require('mssql');
const User = require('../entities/user');

const createUser = async (userData) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('email', sql.VarChar(50), userData.email)
        .input('password', sql.VarChar(sql.MAX), userData.password)
        .input('name', sql.VarChar(30), userData.name)
        .input('lastName', sql.VarChar(50), userData.lastName)
        .input('phone', sql.VarChar(20), userData.phone)
        .input('createdAt', sql.DateTime, userData.createdAt)
        .input('updatedAt', sql.DateTime, userData.updatedAt)
        .query(`
            INSERT INTO users (email, password, name, lastName, phone, created_at, updated_at)
            VALUES (@email, @password, @name, @lastName, @phone, @createdAt, @updatedAt);
            SELECT SCOPE_IDENTITY() AS id;
        `);
    return new User({ ...userData, id: result.recordset[0].id });
};

const getAllUsers = async () => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM users");
    return result.recordset.map(user => new User(user));
};

const getUserById = async (id) => {
    const pool = await getConnection();
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query("SELECT * FROM users WHERE id = @id");
    return result.recordset.length ? new User(result.recordset[0]) : null;
};

const updateUser = async (id, userData) => {
    const pool = await getConnection();
    await pool.request()
        .input('id', sql.Int, id)
        .input('email', sql.VarChar(50), userData.email)
        .input('password', sql.VarChar(sql.MAX), userData.password)
        .input('name', sql.VarChar(30), userData.name)
        .input('lastName', sql.VarChar(50), userData.lastName)
        .input('phone', sql.VarChar(20), userData.phone)
        .input('updatedAt', sql.DateTime, userData.updatedAt)
        .query(`
            UPDATE users
            SET email = @email, password = @password, name = @name, lastName = @lastName, phone = @phone, updated_at = @updatedAt
            WHERE id = @id
        `);
    return await getUserById(id);
};

const deleteUser = async (id) => {
    const pool = await getConnection();
    await pool.request()
        .input('id', sql.Int, id)
        .query("DELETE FROM users WHERE id = @id");
    return { success: true };
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
