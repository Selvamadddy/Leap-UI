import { useState } from "react";
import "../../../stylesheet/TaskCard.css";
import { AddTaskCard, DeleteTaskCard, UpdateTaskCard } from "../ApiCall";

export default function TaskHeader(props){
    const [titleData , setTitleData] = useState(props.titleData);

    const handleInputChange = (e) => {
        setTitleData({...titleData, name : e.target.value});
    }
    const HandleAddNewTaskCard = async () =>{
        await AddTaskCard(props.plannerId);
        props.reloadTaskCardState();
    }
    const HandleDeleteTaskCard = async () =>{
        await DeleteTaskCard(props.titleData.id);
        props.reloadTaskCardState();
    }

    const HandleEnterPress = async (event) => {
        if (event.key === "Enter") {
            await UpdateTaskCard(titleData);
        }
    }

    return(
        <div className = "taskheader" style={{backgroundColor: titleData.headerColour}}>
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
            <input type="text" placeholder="Title" value = {titleData.name} onChange={handleInputChange}  onKeyUp={HandleEnterPress} className="tasktitle"/>
        </div>
    );
}