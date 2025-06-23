import "../../stylesheet/Home.css";
import Cover from "./Header/Cover";
import Menu from "./Menu/Menu";
import Body from "./Body/Body";
import { useState, useEffect } from "react";
import { GetAllPlanners } from "./ApiCall";
import { useNavigate } from 'react-router';
import LinearIndeterminate from "../Common/LinearIndeterminate";

export default function Home() {
  const [data, setData] = useState(null);
  const [currentPlannerId, setCurrentPlannerId] = useState(null);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = async () => {
      const response = await GetAllPlanners()
      console.log(response);
      if(response?.status === "Sucess")
      {
        setData(response?.planners)
        {response?.planners && setCurrentPlannerId(response.planners[0].id)}
      }
      else if(response === "UnAuthorized" || response?.errorMessage === "UnAuthorized")
      {
        navigate('/Login');
      }
      
    };
    handleStorageChange();
  }, [reload]);

  const updateSelectedPlanner = (plannerId) => {
    setCurrentPlannerId(plannerId);
  }

  const ReloadPlannerState = () =>{
    setReload(!reload);
  }

  return (
    <>
      <div className="homepage">
        <div className="coversection">
          <Cover />
        </div>
        {data && <div className="menusection">
          <Menu planners={data} selectedPlannerId = {currentPlannerId} updateSelectedPlanner={updateSelectedPlanner} 
                reloadPlannerState={ReloadPlannerState} />
        </div>}
        {data && <div className="tasksection">
          {currentPlannerId && <Body key={currentPlannerId} currentPlannerId={currentPlannerId} />}
        </div>}
        {!data && <><br/><LinearIndeterminate displayText = "Loading data..."/><br/></>}
      </div>
    </>
  );
}