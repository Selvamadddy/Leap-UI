import { useState, useMemo, useEffect } from "react";
import Tooltip from '@mui/material/Tooltip';
import React from "react";
import "../../../stylesheet/Menu.css";
import PlannerTitleButton from "./PalnnerTitleButton";
import { AddPlanner, GetUserDetails } from "../ApiCall";
import SnackBarMessage from "../../Common/SnackBarMessage";
import Profile from "./profile";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router';

function Menu(props) {
    const [displayCopiedMsg, setdisplayCopiedMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userDetail, setUserDetail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = async () => {
            const response = await GetUserDetails();
            console.log(response);
            if (response?.errorMessage === "UnAuthorized") {
                localStorage.removeItem('token');
                navigate('/Login');
            }
            else if (response?.status === "Sucess") {
                setUserDetail(response);
            }
        };
        handleStorageChange();
    }, []);

    const titleButtons = useMemo(() => {
        if (!props.planners) return null;
        return props.planners.map(x => (
            <PlannerTitleButton
                key={x.id}
                plannerData={x}
                selectedPlannerId={props.selectedPlannerId}
                updateSelectedPlanner={props.updateSelectedPlanner}
                reloadPlannerState={props.reloadPlannerState}
            />
        ));
    }, [props.planners, props.setTask, props.deletePlanner, props.selectedPlannerId]);

    const HandleAddPlanner = async () => {
        setIsLoading(true);
        const resposne = await AddPlanner();
        if (resposne?.errorMessage === "UnAuthorized") {
            localStorage.removeItem('token');
            navigate('/Login');
        }
        setIsLoading(false);
        props.reloadPlannerState();
    }
    const HandleShareButton = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setdisplayCopiedMsg(true);
    }
    const SetdisplayCopiedMsg = () => {
        setdisplayCopiedMsg(false);
    }

    if (!props.planners) return <div>Loading...</div>;

    return (
        <div className="menucontainer">
            <div className="menutoolcontainer">
                <div className="menuleft">
                    <Tooltip title="Home page under construction !!!">
                        <button className="commonbutton">
                            <i className="bi bi-house homeicon"></i>
                        </button>
                    </Tooltip>
                    <a className="name"> My Planner </a>
                    <button className="sharebutton" onClick={HandleShareButton}>
                        <i className="bi bi-share"></i> Share
                    </button>
                </div>
                <div className="menuright">
                    <Tooltip title="Template under construction !!!">
                        <i className="bi bi-journal-check notebookicon"></i>
                    </Tooltip>
                    <Tooltip title="Recycle bin under construction !!!">
                        <i className="bi bi-trash2-fill notebookicon"></i>
                    </Tooltip>
                    <Profile />
                    {userDetail && <b style={{ fontSize: "100%", marginLeft : "4%" }}>{userDetail.userName}</b>}
                </div>
            </div>
            <div className="noteheader">
                {titleButtons}
                {props.planners.length <= 10 && (
                    <Tooltip title="Add new planner">
                    <button className="addbutton" onClick={HandleAddPlanner}>
                        <i className="bi bi-plus-lg"></i>
                    </button>
                    </Tooltip>
                )}
                {isLoading && <CircularProgress color="white" size="1.4%" sx={{ marginLeft: "1%" }} />}
            </div>
            {displayCopiedMsg && <SnackBarMessage message="Url copied." setdisplayCopiedMsg={SetdisplayCopiedMsg} />}
        </div>
    );
}

export default React.memo(Menu);