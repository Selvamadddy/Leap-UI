import { useState } from "react";
import "../../../stylesheet/TaskCard.css";
import { AddTaskCard, DeleteTaskCard, UpdateTaskCard } from "../ApiCall";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router';
import Tooltip from '@mui/material/Tooltip';

export default function TaskHeader(props) {
    const [titleData, setTitleData] = useState(props.titleData);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setTitleData({ ...titleData, name: e.target.value });
    }
    const HandleAddNewTaskCard = async () => {
        setIsLoading(true);
        const response = await AddTaskCard(props.plannerId);
        if (response?.errorMessage === "UnAuthorized") {
            localStorage.removeItem('token');
            navigate('/Login');
        }
        props.reloadTaskCardState();
        setIsLoading(false);
    }
    const HandleDeleteTaskCard = async () => {
        setIsLoading(true);
        const response = await DeleteTaskCard(props.titleData.id);
        if (response?.errorMessage === "UnAuthorized") {
            localStorage.removeItem('token');
            navigate('/Login');
        }
        setIsLoading(false);
        props.reloadTaskCardState();
    }

    const HandleEnterPress = async (event) => {
        if (event.key === "Enter") {
            setIsLoading(true);
            const response = await UpdateTaskCard(titleData);
            if (response?.errorMessage === "UnAuthorized") {
                localStorage.removeItem('token');
                navigate('/Login');
            }
            setIsLoading(false);
        }
    }

    return (
        <div className="taskheader" style={{ backgroundColor: titleData.headerColour }}>
            <div className="tasktool">
                {isLoading && <CircularProgress size="1rem" sx={{ marginRight: "3%", marginTop: "1%" }} />}
                <Tooltip title="Color brush under construction !!!">
                    <button className="toolbutton">
                        <i className="bi bi-brush tool"></i>
                    </button>
                </Tooltip>
                <Tooltip title="Add new card">
                    <button className="toolbutton" onClick={HandleAddNewTaskCard}>
                        <i className="bi bi-file-earmark-plus tool"></i>
                    </button>
                </Tooltip>
                <Tooltip title="Delete this card">
                    <button className="toolbutton" onClick={HandleDeleteTaskCard}>
                        <i className="bi bi-trash tool"></i>
                    </button>
                </Tooltip>
            </div>
            <input type="text" placeholder="Title" value={titleData.name} onChange={handleInputChange} onKeyUp={HandleEnterPress} className="tasktitle" />
        </div>
    );
}