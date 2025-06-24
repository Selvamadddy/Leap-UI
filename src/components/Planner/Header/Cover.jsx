import "../../../stylesheet/Cover.css";
import { useState, useRef } from "react";
import CoverImage from "./CoverImage";


export default function Cover(){

    const [coverImage, setcoverImage] = useState();
    const inputRef = useRef(null);

    const handleUploadButtonClick = () => {
       inputRef.current.click();
    };

    function handleChange(e) {
        setcoverImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleDeleteButtonClick = () =>{
        setcoverImage(null);
    }

    return(
        <div className="covercontainer">
            <div className="coverimgcontainer">
                <CoverImage imgObj={coverImage} />
            </div>
            <div className = "buttoncontainer">
                <input type="file" ref={inputRef} accept="image/png, image/jpeg" onChange={handleChange} style={{opacity: "0"}} />
                <button className="uploadbutton" onClick={handleUploadButtonClick}>Upload</button>
                <button className = "deletebutton" onClick={handleDeleteButtonClick}>
                   <i className="bi bi-trash3 deletepng"></i>
                </button>
            </div>

        </div>

    );
}