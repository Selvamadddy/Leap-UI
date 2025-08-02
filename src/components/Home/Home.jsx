import { useNavigate } from 'react-router';

export default function Home (){
    const navigate = useNavigate();
    const HandleButtonClick = () =>{
        navigate("/Activity");
    }
    return(
        <div style={{backgroundColor : "lightblue"}}>
            <button onClick={HandleButtonClick}>
                Go to Acitivity page
            </button>
        </div>
    );
}