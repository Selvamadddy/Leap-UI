import "../stylesheet/TaskCard.css";
import Task from "./Task";

export default function TaskCard(){
    return(
    <div class="taskcontainer">
        <div class = "taskheader">
            <input type="text" placeholder="Title" class="tasktitle"/>
            <div class ="tasktool">
                <button class="toolbutton">
                    <i class="bi bi-brush tool"></i>
                </button>
                <button class="toolbutton">
                    <i class="bi bi-three-dots tool"></i>
                </button>
            </div>
        </div>
        <div class = "taskbody">
            <Task />
            <Task />
            <Task />
            <Task />
        </div>
    </div>
    );
}