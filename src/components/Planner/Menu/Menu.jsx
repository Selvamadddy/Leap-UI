import "../../../stylesheet/Menu.css";
import profileimg from "../../../assets/profile.PNG";
import PlannerTitleButton from "./PalnnerTitleButton";
import { AddNewPlanner } from "../../LocalStorage";

export default function Menu(props){

    const titleButtons = () =>{
        return props.taskData.map(x => <PlannerTitleButton key={x.PlannerId} data1 = {x} selectTask = {props.setTask} 
            deletePlanner ={props.deletePlanner}/>);
    }

    const HandleAddPlanner = () => {
        AddNewPlanner();
        props.addPlanner();
    }

    return(
        <div className="menucontainer">
            <div className="menutoolcontainer">
                <div className="menuleft">
                    <button className = "commonbutton">
                        <i className="bi bi-house homeicon"></i>
                    </button>        
                    <a className="name"> My Planner </a>
                    <button className = "commonbutton">
                        <i className="bi bi-three-dots"></i>
                    </button>
                    <button className = "sharebutton">
                        <i className="bi bi-share"></i> Share
                    </button>                    
                </div>
                <div className ="menuright">
                    <i className ="bi bi-journal-check notebookicon"></i>
                    <img className ="profile" src={profileimg}></img>
                </div>
            </div>
            <div className = "noteheader">
                {titleButtons()}
                {props.taskData.length <= 10 && <button className="addbutton" onClick = {HandleAddPlanner}>
                    <i className="bi bi-plus-lg"></i>
                </button>}
            </div>
        </div>
    );
}