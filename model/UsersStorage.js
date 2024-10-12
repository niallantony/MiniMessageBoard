class UsersStorage {
    constructor() {
        this.storage = {};
        this.id = 0;
    }

    addUser({ firstName, lastName, email, birthday }) {
        const id = this.id;
        this.storage[id] = { id, firstName, lastName, email, birthday }
        this.id++;
    }

    getUsers() {
        return Object.values(this.storage)
    }

    getUser(id) {
        return this.storage[id];
    }

    updateUser( id, { firstName, lastName, email, birthday }) {
        this.storage[id] = { id, firstName, lastName, email, birthday }; 
    }

    deleteUser(id) {
        delete this.storage[id];
    }
}

module.exports = new UsersStorage();