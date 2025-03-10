const bcrypt = require('bcrypt');

const hashData = async (data) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
};

module.exports = {
    hashData,
};


async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

hashPassword("miClaveSegura123").then(console.log);
