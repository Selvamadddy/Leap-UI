import "../stylesheet/Cover.css";
import coverimg from "../assets/coverimg2.PNG";

export default function Cover(){
    return(
        <div class="covercontainer">
            <div class="coverimgcontainer">
                <img src ={coverimg} class="coverimg3"></img>
            </div>
            <div class = "buttoncontainer">
                <button class="uploadbutton">Upload</button>
                <button class = "deletebutton">
                   <i class="bi bi-trash3 deletepng"></i>
                </button>
            </div>

        </div>

    );
}