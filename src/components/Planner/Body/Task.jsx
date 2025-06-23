import "../../../stylesheet/Task.css";
import { useState, useRef, useEffect } from "react";
import ContentEditable from 'react-contenteditable';
import { DeleteTask, UpdateTask } from "../ApiCall";

export default function Task(props){
    const [taskData , setTaskData] = useState(props.taskData);
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuSelected, setIsMenuSelected] = useState(false);
    const taskDataRef = useRef(taskData);

    useEffect(() => {
        taskDataRef.current = taskData;
    }, [taskData]);

    const HandleCheckBox = async () =>{
        setTaskData({...taskData , isChecked : !taskData.isChecked});
        await UpdateTask({...taskData , isChecked : !taskData.isChecked});
    }

    const Handletext = (event) =>{
        if(event.target.value !== taskData.taskText+"<div><br></div>")
        {
            console.log("value : ", event.target.value)
            setTaskData({...taskData , taskText : event.target.value});
           // UpdateTask(event.target.value);
        }
    }

    const HandleEnterPress = async (event) => {
            if (event.key === "Enter") {
                await UpdateTask(taskDataRef.current);
                props.reloadTaskState();
            }
        }

    const HandleMenuClick = () =>{
        setIsMenuSelected(true);
    }

    const HandleTaskDelete = async () =>{
        await DeleteTask(taskData.id);
        props.reloadTaskState();
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
                    <div className="menuicon">
                        <i className="bi bi-lock"></i>
                        <div className="menuName">Mark Completed</div>
                    </div>
                    <div className="menuicon">
                        <i className="bi bi-unlock2"></i>
                        <div className="menuName">Mark InComplete</div>
                    </div>
                </div>
                }
            </div>
        }
        </>
    );
}