const mysql = require("mysql2");
const util = require("util");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "taskManager",
    charset: "utf8mb4",
});

// Promisify the pool.query function to use async/await
const query = util.promisify(pool.query).bind(pool);

async function executeQuery(queryStatement, params) {
    try {
        let result;
        if (params && params.length > 0) {
            result = await query(queryStatement, params);
        } else {
            result = await query(queryStatement);
        }
        return result;
    } catch (err) {
        console.error(new Date() + ": Error in database", err);
        throw err;
    }
}

module.exports = {
    executeQuery,
};
