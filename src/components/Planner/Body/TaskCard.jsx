import { useState, useEffect } from "react";
import "../../../stylesheet/TaskCard.css";
import Task from "./Task";
import TaskHeader from "./TaskHeader.jsx";
import { GetAllTask, AddTask } from "../ApiCall";

export default function TaskCard(props){
    const [tasksData, setTasksData] = useState(null);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const handleStorageChange = async () => {
            const response = await GetAllTask(props.taskCardData.id)
            setTasksData(response.tasks)
        };
        handleStorageChange();
    }, [reload]);

    const AddTaskHandler = async () =>{
        await AddTask(props.taskCardData.id);
        setReload(!reload);
    }

    const ReloadTaskState = () =>{
        setReload(!reload);
    }

    return(
    <div className="taskcontainer">
        <TaskHeader titleData = {props.taskCardData} plannerId = {props.plannerId} 
                    reloadTaskCardState = {props.reloadTaskCardState} />
        <div className = "taskbody">
            {tasksData && tasksData.map(x => 
                <Task key = {x.id} taskData={x} reloadTaskState={ReloadTaskState}/>)
            }
        </div>
        <button className="addtaskbutton" onClick={AddTaskHandler}> Add new task</button>
    </div>
    );
}