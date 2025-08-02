import "../../../stylesheet/Body.css"
import TaskCard from "./TaskCard"
import { useState, useEffect } from "react";
import { GetAllTaskCards } from "../ApiCall";
import { useNavigate } from 'react-router';

export default function Body(props) {
    const [data, setData] = useState(null);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = async () => {
            const response = await GetAllTaskCards(props.currentPlannerId)
            if (response?.errorMessage === "UnAuthorized") {
                localStorage.removeItem('token');
                navigate('/Login');
            }
            setData(response.taskCards)
        };
        handleStorageChange();
    }, [reload]);

    const ReloadTaskCardState = () => {
        setReload(!reload);
    }

    const taskCards = () => {
        return data.map(x => <TaskCard key={x.id} taskCardData={x} plannerId={props.currentPlannerId}
            reloadTaskCardState={ReloadTaskCardState} />);
    }

    return (
        <div className="bodycontainer">
            <div className="gridcontainer">
                {data && taskCards()}
            </div>
        </div>
    );
}