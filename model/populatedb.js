require("dotenv").config()
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstname VARCHAR ( 255 ),
    lastname VARCHAR ( 255 ),
    email VARCHAR ( 255 ),
    birthday VARCHAR ( 255 )
    );
    
    INSERT INTO usernames (firstname, lastname, email, birthday)
    VALUES
        ('Bryan', 'Cranston', 'bcranny@googlemail.com','19943012'),
        ('Odin', 'Forkbeard', 'oldoneeye@yahoo.com','19882305'),
        ('Damon', 'Alben', 'blurrock@lamename.com','19762210');
    `;

    async function main() {
        console.log('seeding...');
        const client = new Client({
            connectionString: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:5432/${process.env.DATABASE_NAME}?ssl=true`,
        });
        await client.connect();
        await client.query(SQL);
        await client.end();

        console.log("done");
    }

    main()