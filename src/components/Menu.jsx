import "../stylesheet/Menu.css"
import profileimg from "../assets/profile.PNG"

export default function Menu(){
    return(
        <div class="menucontainer">
            <div class="menutoolcontainer">
                <div class="menuleft">
                    <button class = "commonbutton">
                        <i class="bi bi-house homeicon"></i>
                    </button>        
                    <a class="name"> My Planner </a>
                    <button class = "commonbutton">
                        <i class="bi bi-three-dots"></i>
                    </button>
                    <button class = "sharebutton">
                        <i class="bi bi-share"></i> Share
                    </button>
                    
                </div>
                <div class ="menuright">
                    <i class="bi bi-journal-check notebookicon"></i>
                    <img class="profile" src={profileimg}></img>
                </div>
            </div>
            <div class = "noteheader">
                <button class="notebutton notebutton1">
                    my space
                    <button class="closebutton">
                        <i class="bi bi-x-circle"></i>
                    </button>                   
                </button>
                <button class="notebutton">
                    next week
                    <button class="closebutton">
                        <i class="bi bi-x-circle"></i>
                    </button>
                </button>
                <button class="addbutton">
                    <i class="bi bi-plus-lg"></i>
                </button>
            </div>
        </div>
    );
}