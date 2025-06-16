import "../../../stylesheet/Cover.css";
import coverImgPath from "../../../assets/coverimg2.PNG";

export default function CoverImage(props){

    return(
        <>
        { props.imgObj ? <img src ={props.imgObj} className="coverimg3"/> : <img src ={coverImgPath} className="coverimg3"/>}
        </>
    );
}