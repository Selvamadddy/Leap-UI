import "../../../stylesheet/PlannerTitleButton.css";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { DeletePlanner, UpdatePlanner } from "../ApiCall";
import { useNavigate } from 'react-router';

export default function PlannerTitleButton(props) {
    const [isMenuHovered, setIsMenuHovered] = useState(false);
    const [isEditIconVisible, setIsEditIconVisible] = useState(false);
    const [title, setTitle] = useState(props.plannerData.name);
    const [isTitleEdit, setIsTitleEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const HandleButtonClick = () => {
        props.updateSelectedPlanner(props.plannerData.id);
    }

    const HandleEditButtonClick = () => {
        setIsTitleEdit(true);
    }

    const HandleDeleteButtonCLick = async () => {
        setIsLoading(true);
        const resposne = await DeletePlanner(props.plannerData.id);
        if (resposne?.errorMessage === "UnAuthorized") {
            localStorage.removeItem('token');
            navigate('/Login');
        }
        setIsLoading(false);
        props.reloadPlannerState();
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const HandleEnterPress = async (event) => {
        if (event.key === "Enter") {
            setIsLoading(true);

            const resposne = await UpdatePlanner(props.plannerData.id, title);
            if (resposne?.errorMessage === "UnAuthorized") {
                localStorage.removeItem('token');
                navigate('/Login');
            }
            setIsLoading(false);
            setIsTitleEdit(false);
        }
    }

    return (
        <>
            <button className="plannerButton" onClick={HandleButtonClick} style={{
                boxShadow: props.plannerData.id === props.selectedPlannerId ? "3px 4px 3px rgb(180, 177, 177)" : "",
                opacity: props.plannerData ? 1 : 0.7
            }}
                onMouseEnter={() => setIsEditIconVisible(true)} onMouseLeave={() => setIsEditIconVisible(false)}>

                <input type="text" value={title} placeholder="My Planner" className="plannerTitle" maxLength="15" size={title.length <= 4 ? 6 : title.length - 2}
                    onChange={handleTitleChange} readOnly={!isTitleEdit} onKeyUp={HandleEnterPress} style={{ color: isTitleEdit ? "black" : "white" }} />

                {isEditIconVisible && <div className="menu1">
                    <i className="bi bi-pencil-square" onMouseEnter={() => setIsMenuHovered(true)} onMouseLeave={() => setIsMenuHovered(false)}></i>
                </div>
                }

                {isMenuHovered && <div className="menuOptions1" onMouseEnter={() => setIsMenuHovered(true)} onMouseLeave={() => setIsMenuHovered(false)}>
                    <div className="menuicon1" onClick={HandleEditButtonClick}>
                        <i className="bi bi-pen"></i>
                        <div className="menuName1">Edit Name</div>
                    </div>
                    <div className="menuicon1" onClick={HandleDeleteButtonCLick}>
                        <i className="bi bi-trash"></i>
                        <div className="menuName1">Delete</div>
                    </div>
                </div>
                }
            </button>
            {isLoading && <CircularProgress color="white" size="1.4%" sx={{ marginLeft: "-1.7%" }} />}
        </>
    );
}