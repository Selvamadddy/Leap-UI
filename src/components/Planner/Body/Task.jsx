import "../../../stylesheet/Task.css";
import { useState, useRef, useEffect } from "react";
import ContentEditable from 'react-contenteditable';
import { DeleteTask, UpdateTask } from "../ApiCall";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router';

export default function Task(props) {
    const [taskData, setTaskData] = useState(props.taskData);
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuSelected, setIsMenuSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const taskDataRef = useRef(taskData);
    const navigate = useNavigate();

    useEffect(() => {
        taskDataRef.current = taskData;
    }, [taskData]);

    const HandleCheckBox = async () => {
        setIsLoading(true);
        setTaskData({ ...taskData, isChecked: !taskData.isChecked });

        const response = await UpdateTask({ ...taskData, isChecked: !taskData.isChecked });
        if (response?.errorMessage === "UnAuthorized") {
            localStorage.removeItem('token');
            navigate('/Login');
        }
        setIsLoading(false);
    }

    const HandleMarkComplete = async () => {
        setIsLoading(true);
        setTaskData({ ...taskData, isChecked: true });
        const response = await UpdateTask({ ...taskData, isChecked: true });
        if (response?.errorMessage === "UnAuthorized") {
            localStorage.removeItem('token');
            navigate('/Login');
        }
        setIsLoading(false);
    }

    const HandleMarkInComplete = async () => {
        setIsLoading(true);
        setTaskData({ ...taskData, isChecked: false });
        const response = await UpdateTask({ ...taskData, isChecked: false });
        if (response?.errorMessage === "UnAuthorized") {
            localStorage.removeItem('token');
            navigate('/Login');
        }
        setIsLoading(false);
    }

    const Handletext = (event) => {
        if (event.target.value !== taskData.taskText + "<div><br></div>") {
            setTaskData({ ...taskData, taskText: event.target.value });
        }
    }

    const HandleEnterPress = async (event) => {
        if (event.key === "Enter") {
            setIsLoading(true);

            const response = await UpdateTask(taskDataRef.current);
            if (response?.errorMessage === "UnAuthorized") {
                localStorage.removeItem('token');
                navigate('/Login');
            }
            props.reloadTaskState();
            setIsLoading(false);
        }
    }

    const HandleMenuClick = () => {
        setIsMenuSelected(true);
    }

    const HandleTaskDelete = async () => {
        setIsLoading(true);
        const response = await DeleteTask(taskData.id);
        if (response?.errorMessage === "UnAuthorized") {
            localStorage.removeItem('token');
            navigate('/Login');
        }
        props.reloadTaskState();
        setIsLoading(false);
    }

    return (
        <>{taskData &&
            <div className="task1" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false); setIsMenuSelected(false); }}>
                {isHovered && <i className="bi bi-three-dots-vertical taskmenu" onClick={HandleMenuClick}>
                </i>}
                <input className="checkbox1" type="checkbox" checked={taskData.isChecked} onChange={HandleCheckBox} style={{ marginLeft: isHovered ? 0 : "1vw" }} />
                <ContentEditable className="input-box" html={taskData.taskText} placeholder="Add a task..." onChange={Handletext} onKeyUp={HandleEnterPress} />
                {isMenuSelected && <div className="menuOptions">
                    <div className="menuicon" onClick={HandleTaskDelete}>
                        <i className="bi bi-trash"></i>
                        <div className="menuName">Delete</div>
                    </div>

                    {!taskData.isChecked && <div className="menuicon" onClick={HandleMarkComplete}>
                        <i className="bi bi-lock"></i>
                        <div className="menuName">Mark Completed</div>
                    </div>}

                    {taskData.isChecked && <div className="menuicon" onClick={HandleMarkInComplete}>
                        <i className="bi bi-unlock2"></i>
                        <div className="menuName">Mark InComplete</div>
                    </div>}
                </div>
                }
                {isLoading && <CircularProgress size="4.5%" sx={{ marginLeft: "10%" }} />}
            </div>
        }
        </>
    );
}