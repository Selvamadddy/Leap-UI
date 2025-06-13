import "../stylesheet/Task.css";
import React, { useState } from "react";
import {UpdateTaskData} from "./LocalStorage.js";
import ContentEditable from 'react-contenteditable';

export default function Task(props){
    const [taskData , setTaskData] = useState(props.taskData);
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuSelected, setIsMenuSelected] = useState(false);

    const HandleCheckBox = () =>{
        setTaskData({...taskData , isChecked : !taskData.isChecked})
        UpdateTaskData({...taskData , isChecked : !taskData.isChecked}, props.cardId, props.plannerId);
    }

    const Handletext = (event) =>{
        setTaskData({...taskData , text : event.target.value})
        UpdateTaskData({...taskData , text : event.target.value}, props.cardId, props.plannerId);
    }

    const HandleMenuClick = () =>{
        setIsMenuSelected(true);
    }

    const HandleTaskDelete =() =>{
        props.deletetask(taskData.id);
    }

    return(
        <div className="task1" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => {setIsHovered(false); setIsMenuSelected(false);}}>
          { isHovered && <i className="bi bi-three-dots-vertical taskmenu" onClick={HandleMenuClick}>
          </i> }
           <input className="checkbox1" type="checkbox" checked={taskData.isChecked} onChange={HandleCheckBox} style={{marginLeft : isHovered ? 0 : "1vw"}}/>
           <ContentEditable className="input-box" html={taskData.text} placeholder="Add a task..." onChange={Handletext}/>
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
    );
}