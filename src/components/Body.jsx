import "../stylesheet/Body.css"
import TaskCard from "./TaskCard"

export default function Body(){
    return(
        <div class="bodycontainer">
            <div class="gridcontainer">
                <TaskCard />     
                <TaskCard />  
                <TaskCard />  
                <TaskCard />                
            </div>
        </div>
    );
}