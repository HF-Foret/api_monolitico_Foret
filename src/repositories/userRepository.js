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

module.exports = {
    createUser,
    getAllUsers,
};