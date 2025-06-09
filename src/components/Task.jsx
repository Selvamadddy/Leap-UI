import "../stylesheet/Task.css";

export default function Task(){
    return(
        <div class="task1">
           <input type="checkbox"/>
           <div class="input-box" contenteditable="true" placeholder="Add a task..."></div>
        </div>
    );
}