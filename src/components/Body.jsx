import "../stylesheet/Body.css"
import TaskCard from "./TaskCard"
import { useState } from "react";
import { LocalStorage1} from "./LocalStorage";

export default function Body(props){
    const [data, setData] = useState({...props.taskData1});


    const reloadAllTask = () =>{
        setData(LocalStorage1().find(x => x.PlannerId === data.PlannerId));
    }

    const taskCards = () =>{
        return data.Data.map(x => <TaskCard key = {x.CardId} taskCardData = {x} plannerId = {data.PlannerId} reloadCard={reloadAllTask}/>  );
    }

    return(
        <div className="bodycontainer">
            <div className="gridcontainer">
                {taskCards()}                
            </div>
        </div>
    );
}