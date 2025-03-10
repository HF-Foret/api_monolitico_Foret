class User {
    constructor({ id, email, password, name, lastName, phone, createdAt, updatedAt }) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
}

module.exports = User;