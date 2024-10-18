const pool = require("./pool");

async function getAllUsers(){
    const { rows } = await pool.query("SELECT * FROM usernames ORDER BY id");
    return rows;
}

async function insertUser(firstName, lastName, email, birthday) {
    try {
        await pool.query("INSERT INTO usernames (firstName, lastName, email, birthday) VALUES ($1, $2, $3, $4)",
           [firstName, lastName, email, birthday]);
    } catch(e) {
        console.log(e);
    }
}

async function getUser(userId) {
    const { rows } = await pool.query("SELECT * FROM usernames WHERE id = $1", [userId])
    return rows;
}

async function updateUser(userId, user) {
    const { firstName, lastName, email, birthday } = user;
    await pool.query("UPDATE usernames SET firstName = $1, lastName = $2, email = $3, birthday = $4 WHERE id = $5",
        [firstName, lastName, email, birthday, userId]
    );
}

module.exports = {
    getAllUsers,
    insertUser,
    getUser,
    updateUser,
}