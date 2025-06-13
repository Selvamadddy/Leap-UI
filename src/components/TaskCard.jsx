import { useState } from "react";
import "../stylesheet/TaskCard.css";
import Task from "./Task";
import TaskHeader from "./TaskHeader";
import {AddNewTask, AddNewTaskCard, DeleteTaskCard} from "./LocalStorage.js";

export default function TaskCard(props){
    const [tasksData , setTasksData] = useState(props.taskCardData.Tasks); 

    const AddTask = () =>{
        const newTaskId = tasksData.length + 1;
        const newTask = {
                        "id" : newTaskId,
                        "isChecked" : false,
                        "text" : ""
                    };
        
        setTasksData([...tasksData, newTask]);
        AddNewTask([...tasksData, newTask], props.taskCardData.CardId, props.plannerId );
    }

    const DeleteTask = (taskId) =>{
        const taskindex = tasksData.findIndex(x => x.id == taskId);
        const v1 = tasksData;
        v1.splice(taskindex, 1);
        setTasksData([...v1]);
        AddNewTask([...v1], props.taskCardData.CardId, props.plannerId );
    }

    const AddNewCard = () =>{
        AddNewTaskCard(props.plannerId);
        props.reloadCard();
    }
    const DeleteCard = () =>{
        DeleteTaskCard(props.plannerId, props.taskCardData.CardId);
        props.reloadCard();
    }

    return(
    <div className="taskcontainer">
        <TaskHeader titleData = {props.taskCardData.Title} cardId={props.taskCardData.CardId} plannerId = {props.plannerId} 
            addNewTaskCard1 = {AddNewCard} deleteTaskCard1 = {DeleteCard}/>
        <div className = "taskbody">
            {tasksData.map(x => <Task key = {x.id} taskData = {x} cardId={props.taskCardData.CardId} plannerId = {props.plannerId} deletetask={DeleteTask}/>)}
        </div>
        <button className="addtaskbutton" onClick={AddTask}> Add new task</button>
    </div>
    );
}