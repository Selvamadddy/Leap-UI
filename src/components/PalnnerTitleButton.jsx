import "../stylesheet/PlannerTitleButton.css";
import { useState } from "react";
import { DeletePlanner, UpdatePlannerName } from "./LocalStorage";

export default function PlannerTitleButton(props){
    const [isMenuHovered, setIsMenuHovered] = useState(false);
    const [isEditIconVisible, setIsEditIconVisible] = useState(false);
    const [title, setTitle] = useState(props.data1.PlannerName);
    const [isTitleEdit, setIsTitleEdit] = useState(false);


    const HandleButtonClick = () => {
        props.selectTask(props.data1.PlannerId);
    }
    const HandleEditButtonClick = () =>{
        setIsTitleEdit(true);
    }

    const HandleDeleteButtonCLick = () =>{
        DeletePlanner(props.data1.PlannerId);
        props.deletePlanner(props.data1.PlannerId);
    }
    const handleTitleChange =(event) =>{
        setTitle(event.target.value);
        UpdatePlannerName(props.data1.PlannerId, event.target.value);
    }
    const HandleEnterPress = (event) =>{
        if(event.key === "Enter"){
            setIsTitleEdit(false);
        }
    }

    return(
        <>
        <button className ="plannerButton" onClick={HandleButtonClick} style = {{boxShadow : props.data1.IsSelected ? "3px 4px 3px rgb(180, 177, 177)" : "" , opacity : props.data1.IsSelected ? 1 : 0.7}}
                onMouseEnter={() => setIsEditIconVisible(true)} onMouseLeave={() => setIsEditIconVisible(false)}>
            
            <input type="text" value={title} placeholder="My Planner" className="plannerTitle" maxLength="15" size={title.length <= 4 ? 6 : title.length - 2} 
                onChange={handleTitleChange} readOnly = {!isTitleEdit}  onKeyUp={HandleEnterPress} style={{color : isTitleEdit ? "black" : "white"}}/>
            
            {isEditIconVisible && <div className ="menu1">
                <i className="bi bi-pencil-square" onMouseEnter={() => setIsMenuHovered(true)} onMouseLeave={() => setIsMenuHovered(false)}></i>    
            </div>
            }

            {isMenuHovered && <div className="menuOptions1" onMouseEnter={() => setIsMenuHovered(true)} onMouseLeave={() => setIsMenuHovered(false)}>
                    <div className="menuicon1" onClick={HandleEditButtonClick}>
                        <i className="bi bi-pen"></i>
                        <div className="menuName1">Edit Name</div>
                    </div>
                    <div className="menuicon1" onClick={HandleDeleteButtonCLick}>
                        <i className="bi bi-trash"></i>
                        <div className="menuName1">Delete</div>
                    </div>
                </div>
            }                   
        </button>
        </>
    );
}