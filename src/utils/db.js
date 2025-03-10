const sql = require("mssql");
require("dotenv").config();

const dbSetting = {
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    server: process.env.DBSERVER,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 60000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true,
        rowCollectionOnRequestCompletion: true,
    }
};

const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSetting);
        console.log("Conectado a la base de datos");
        return pool;
    } catch (error) {
        console.log("Error de conexión: ", error);
        throw error;
    }
};

module.exports = {
    getConnection,
};