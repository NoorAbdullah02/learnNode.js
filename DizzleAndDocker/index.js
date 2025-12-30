const db = require("./db/index");
const { userSchema } = require("./drizzle/schema");

async function getAlluser() {
    const users = await db.select().from(userSchema);
    console.log(`User is `, users);
    return users;
}

getAlluser();

async function createUser(id, name, email) {
    await db.insert(userSchema).values({
        id, name, email
    })

}

// createUser(1, 'imran', 'noor@gmail.com');
// createUser(2, 'noor', 'noor1@gmail.com');

getAlluser();