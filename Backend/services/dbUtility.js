((dbUtility) => {
    const db = require("../config/dbConnection");

    // get tasks
    dbUtility.getTasks = async () => {
        try {
            const query = "SELECT * FROM Tasks";
            const result = await db.executeQuery(query);
            return result;
        } catch (err) {
            console.log("Error in dbUtility.getTasks service", err);
            throw err;
        }
    };
    // Create task
    dbUtility.createTask = async (title, description, createdAt, updatedAt) => {
        try {
            const query = "INSERT INTO Tasks(title, description, created_at, updated_at) VALUES(?, ? ,?, ?)";
            const params = [title, description, createdAt, updatedAt];
            const result = await db.executeQuery(query, params);
            return result;
        } catch (err) {
            console.log("Error in dbUtility.createTask service", err);
            throw err;
        }
    };

    // Update task
    dbUtility.updateTask = async (title, description, updatedAt, id) => {
        try {
            const query = "UPDATE Tasks SET title = ?, description = ?, updated_at = ? WHERE id = ?";
            const params = [title, description, updatedAt, id];
            const result = await db.executeQuery(query, params);
            return result;
        } catch (err) {
            console.log("Error in dbUtility.updateTask service", err);
            throw err;
        }
    };

    // Delete task
    dbUtility.deleteTask = async (id) => {
        try {
            const query = "DELETE FROM Task WHERE id = ?";
            const params = [id];
            const result = await db.executeQuery(query, params);
            return result;
        } catch (err) {
            console.log("Error in dbUtility.deleteTask service", err);
            throw err;
        }
    };
})(module.exports);
