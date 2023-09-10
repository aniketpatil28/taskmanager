import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [tableData, setTableData] = useState();
    const [taskId, setTaskId] = useState();
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [updateTaskButton, setUpdateTaskButton] = useState(false);
    const APIBaseURL = "http://localhost:8080";
    useEffect(() => {
        const data = async () => {
            const response = await axios(`${APIBaseURL}/getTasks`);
            console.log("response", response);
            const data = response?.data();
            setTableData(data);
        };
        data();
    }, []);

    const data = async () => {
        const response = await axios(`${APIBaseURL}/getTasks`);
        console.log("response", response);
        const data = response?.data();
        setTableData(data);
    };

    const handleTaskButtonClick = async () => {
        if (updateTaskButton) {
            // Update task
            // const updatedData = data?.map((val) => {
            //     if (val.id == taskId) {
            //         val = { id: val.id, title: taskTitle, description: taskDescription };
            //     }
            //     return val;
            // });
            // setTableData(updatedData);
            const updateBody = { title: taskTitle, description: taskDescription };
            const createTask = await axios.post(`${APIBaseURL}/updateTask/${taskId}`, updateBody);
            data();
            setUpdateTaskButton(false);
            data();
        } else {
            // Create task
            // const updatedData = tableData?.push();
            const body = { title: taskTitle, description: taskDescription };
            const createTask = await axios.post(`${APIBaseURL}/createTask`, body);
            data();
            // setTableData([...tableData, { id: tableData?.length + 1, title: taskTitle, description: taskDescription }]);
        }
    };

    console.log("updateTaskButton", updateTaskButton);

    const handleEditTaskButtonClick = (item) => {
        setTaskId(item?.id);
        setTaskTitle(item?.title);
        setTaskDescription(item?.description);
        setUpdateTaskButton(true);
    };

    const handleDeleteTaskButtonClick = async (taskId) => {
        // const updatedData = tableData?.filter((item) => item.id !== taskId);
        // setTableData(updatedData);
        const createTask = await axios.delete(`${APIBaseURL}/deleteTask/${taskId}`);
        data();
    };

    return (
        <>
            <div className="home_container">
                <div className="left_container">
                    <div className="table_container">
                        <h1>Table View</h1>
                        <table>
                            <thead>
                                <tr style={{ padding: "10px" }}>
                                    <th style={{ padding: "10px" }}>ID</th>
                                    <th style={{ padding: "10px" }}>Name</th>
                                    <th style={{ padding: "10px" }}>Description</th>
                                    <th style={{ padding: "10px" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{ padding: "10px" }}>{item.id}</td>
                                        <td style={{ padding: "10px" }}>{item.title}</td>
                                        <td style={{ padding: "10px" }}>{item.description}</td>
                                        <td>
                                            <button className="action_button" onClick={() => handleEditTaskButtonClick(item)}>
                                                Edit
                                            </button>
                                            <button className="action_button" onClick={() => handleDeleteTaskButtonClick(item?.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="right_container">
                    <h1 style={{ marginLeft: "-50px" }}>Create task</h1>
                    <div className="create_task_form_container">
                        <input type="hidden" name="" value={taskId ? taskId : null} />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <label style={{ left: 0 }}>Enter a title</label>
                            <input type="text" className="create_form_input" value={taskTitle ? taskTitle : ""} onChange={(e) => setTaskTitle(e?.target?.value)} />
                        </div>
                        <div>
                            <label style={{ left: 0 }}>Enter description</label>
                            <input type="text" className="create_form_input" value={taskDescription ? taskDescription : ""} onChange={(e) => setTaskDescription(e?.target?.value)} />
                        </div>
                        <button className="create_task_button" onClick={() => handleTaskButtonClick()}>
                            {updateTaskButton ? "Update task" : "Create task"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
