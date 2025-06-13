import { useState } from "react";
import "../stylesheet/TaskCard.css";
import {UpdateTaskHeader} from "./LocalStorage.js";

export default function TaskHeader(props){
    const [titleData , setTitleData] = useState(props.titleData);

    const handleInputChange = (e) => {
        setTitleData({...titleData, name : e.target.value});
        UpdateTaskHeader({...titleData, name : e.target.value} , props.cardId, props.plannerId)
    }
    const HandleAddNewTaskCard = () =>{
        props.addNewTaskCard1();
    }
    const HandleDeleteTaskCard = () =>{
        props.deleteTaskCard1();
    }

    return(
        <div className = "taskheader" style={{backgroundColor: titleData.color}}>
            <div className ="tasktool">
                <button className ="toolbutton">
                    <i className ="bi bi-brush tool"></i>
                </button>
                <button className ="toolbutton" onClick={HandleAddNewTaskCard}>
                    <i className="bi bi-file-earmark-plus tool"></i>
                </button>
                <button className ="toolbutton" onClick={HandleDeleteTaskCard}>
                    <i className="bi bi-trash tool"></i>
                </button>
            </div>
            <input type="text" placeholder="Title" value = {titleData.name} onChange={handleInputChange} className="tasktitle"/>
        </div>
    );
}