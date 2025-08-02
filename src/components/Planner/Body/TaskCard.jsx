import { useState, useEffect } from "react";
import "../../../stylesheet/TaskCard.css";
import Task from "./Task";
import TaskHeader from "./TaskHeader.jsx";
import { GetAllTask, AddTask } from "../ApiCall";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router';

export default function TaskCard(props) {
    const [tasksData, setTasksData] = useState(null);
    const [reload, setReload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = async () => {
            const response = await GetAllTask(props.taskCardData.id)
            if (response?.errorMessage === "UnAuthorized") {
                localStorage.removeItem('token');
                navigate('/Login');
            }
            setTasksData(response.tasks)
        };
        handleStorageChange();
    }, [reload]);

    const AddTaskHandler = async () => {
        setIsLoading(true);
        const response = await AddTask(props.taskCardData.id);
        if (response?.errorMessage === "UnAuthorized") {
            localStorage.removeItem('token');
            navigate('/Login');
        }
        setIsLoading(false);
        setReload(!reload);
    }

    const ReloadTaskState = () => {
        setReload(!reload);
    }

    return (
        <div className="taskcontainer">
            <TaskHeader titleData={props.taskCardData} plannerId={props.plannerId}
                reloadTaskCardState={props.reloadTaskCardState} />
            <div className="taskbody">
                {tasksData && tasksData.map(x =>
                    <Task key={x.id} taskData={x} reloadTaskState={ReloadTaskState} />)
                }
            </div>
            <button className="addtaskbutton" onClick={AddTaskHandler}>
                Add new task
                {isLoading && <CircularProgress color="white" size="13%" sx={{ marginLeft: "1%" }} />}
            </button>

        </div>
    );
}