import "../../stylesheet/Home.css";
import Cover from "./Header/Cover";
import Menu from "./Menu/Menu";
import Body from "./Body/Body";
import { useState, useEffect } from "react";
import { LocalStorage1, GetSelectedPlanner, UpdateSelectedPlanner } from "../LocalStorage";

export default function Home() {
  const [data, setData] = useState(() => LocalStorage1());
  const [currentPlannerId, setCurrentPlannerId] = useState(() => {
    const selected = GetSelectedPlanner();
    return selected?.PlannerId || null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setData(LocalStorage1());
    };
    handleStorageChange();
  }, [currentPlannerId]);

  const selectTaskData = (plannerId) => {
    UpdateSelectedPlanner(plannerId);
    setCurrentPlannerId(plannerId);
  }

  const addNewPlanner = () =>{
    setData(LocalStorage1());
    setCurrentPlannerId(GetSelectedPlanner().PlannerId);
  }

  const deletePlanner = (plannerId) =>{
    setData(LocalStorage1());
    setCurrentPlannerId(GetSelectedPlanner().PlannerId);
  }

  const currentPlannerData = data.find(x => x.PlannerId == currentPlannerId);
  const tasksdatas = data;

  return (
    <div className="homepage">
      <div className="coversection">
        <Cover />
      </div>
      <div className="menusection">
        <Menu taskData={tasksdatas} setTask={selectTaskData} addPlanner={addNewPlanner} deletePlanner = {deletePlanner}/>
      </div>         
      <div className="tasksection">
        {currentPlannerData && <Body key={currentPlannerId} taskData1={currentPlannerData} />}
      </div>
    </div>
  );
}