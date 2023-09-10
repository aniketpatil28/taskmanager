((taskManagerService) => {
    const dbUtility = require("./dbUtility");

    // Get tasks
    taskManagerService.getTasks = async () => {
        try {
            const data = await dbUtility.getTasks();
            return data;
        } catch (err) {
            console.log("Error in taskManagerService.getTasks service", err);
            throw err;
        }
    };

    // Create task
    taskManagerService.createTask = async (details) => {
        try {
            const currentDateTime = Math.floor(Date.now() / 1000);
            const data = await dbUtility.createTask(details?.title, details?.description, currentDateTime, currentDateTime);
            return data;
        } catch (err) {
            console.log("Error in taskManagerService.createTask service", err);
            throw err;
        }
    };

    // Update task
    taskManagerService.updateTask = async (details, params) => {
        try {
            const currentDateTime = Math.floor(Date.now() / 1000);
            const data = await dbUtility.updateTask(details?.title, details?.description, currentDateTime, params?.id);
            return data;
        } catch (err) {
            console.log("Error in taskManagerService.updateTask service", err);
            throw err;
        }
    };

    // Delte task
    taskManagerService.deleteTask = async (params) => {
        try {
            const data = await dbUtility.deleteTask(params?.id);
            return data;
        } catch (err) {
            console.log("Error in taskManagerService.deleteTask service", err);
            throw err;
        }
    };
})(module.exports);
