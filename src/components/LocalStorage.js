import DataJson from "../assets/Data.json";

export const LocalStorage1 = () => {
    const savedData = localStorage.getItem('LeapData');
    if (savedData) {
        console.log("retrieve saved item in local storage");
        return JSON.parse(savedData);
    }
    else {
        console.log("add item in local storage");
        localStorage.setItem('LeapData', JSON.stringify(DataJson));
        return JSON.parse(localStorage.getItem('LeapData'));
    }
};

export const GetSelectedPlanner = () => {
    const data = JSON.parse(localStorage.getItem('LeapData'));
    const plannerIndex = data.findIndex(x => x.IsSelected == true);
    return data[plannerIndex];
};

export const UpdateSelectedPlanner = (plannerId) => {
    console.log("Update selected planner started.");
    const data = JSON.parse(localStorage.getItem('LeapData'));
    const plannerIndex = data.findIndex(x => x.PlannerId == plannerId);
    if (plannerIndex >= 0) {
        const Updated = data.map((x) => { return { ...x, IsSelected: false } });
        Updated[plannerIndex].IsSelected = true;
        localStorage.removeItem('LeapData');
        localStorage.setItem('LeapData', JSON.stringify(Updated));
    }
    console.log("Update selected planner ended.");
};

export const AddNewPlanner = () => {
    console.log("Added new planner started.");
    const data = JSON.parse(localStorage.getItem('LeapData'));
    const newPlanner = {
        "PlannerId": data[data.length - 1].PlannerId + 1,
        "PlannerName": "My Planner",
        "IsSelected": true,
        "Data": [
            {
                "CardId": 1,
                "Title": {
                    "name": "",
                    "color": ""
                },
                "Tasks": [
                    {
                        "id": 1,
                        "isChecked": false,
                        "text": ""
                    }
                ]
            }
        ]
    };
    localStorage.removeItem('LeapData');
    localStorage.setItem('LeapData', JSON.stringify([...data, newPlanner]));
    UpdateSelectedPlanner(newPlanner.PlannerId);
    console.log("Added new planner ended.", newPlanner.PlannerId);
};

export const DeletePlanner = (plannerId) => {
    console.log("Delete planner started.");
    const data = JSON.parse(localStorage.getItem('LeapData'));
    const plannerIndex = data.findIndex(x => x.PlannerId == plannerId);
    if (plannerIndex >= 0) {
        console.log("planner id : ", plannerId);
        data.splice(plannerIndex, 1);
        localStorage.removeItem('LeapData');
        localStorage.setItem('LeapData', JSON.stringify(data));
        UpdateSelectedPlanner(data[data.length - 1].PlannerId);
    }
    console.log("Delete planner ended.");
};

export const UpdatePlannerName = (plannerId, name) => {
    console.log("Update planner name started.");
    const data = JSON.parse(localStorage.getItem('LeapData'));
    const plannerIndex = data.findIndex(x => x.PlannerId == plannerId);
    if (plannerIndex >= 0) {
        data[plannerIndex].PlannerName = name;
        localStorage.removeItem('LeapData');
        localStorage.setItem('LeapData', JSON.stringify(data));
    }
    console.log("Update planner name ended.");
};


















export const UpdateTaskData = (task, taskCardId, plannerId) => {
    console.log("UpdateTaskData started.");
    const data = JSON.parse(localStorage.getItem('LeapData'));
    const plannerIndex = data.findIndex(x => x.PlannerId == plannerId);
    if (plannerIndex >= 0) {
        const cardIndex = data[plannerIndex].Data.findIndex(x => x.CardId == taskCardId);
        if (cardIndex >= 0) {
            const taskId = data[plannerIndex].Data[cardIndex].Tasks.findIndex(x => x.id == task.id);
            if (taskId >= 0) {
                data[plannerIndex].Data[cardIndex].Tasks[taskId].isChecked = task.isChecked;
                data[plannerIndex].Data[cardIndex].Tasks[taskId].text = task.text;
            }
        }
        localStorage.removeItem('LeapData');
        localStorage.setItem('LeapData', JSON.stringify(data));
    }
    console.log("UpdateTaskData ended.");
};

export const UpdateTaskHeader = (headerData, taskCardId, plannerId) => {
    console.log("Update task header data started.");
    const data = JSON.parse(localStorage.getItem('LeapData'));
    const plannerIndex = data.findIndex(x => x.PlannerId == plannerId);
    if (plannerIndex >= 0) {
        const cardIndex = data[plannerIndex].Data.findIndex(x => x.CardId == taskCardId);
        if (cardIndex >= 0) {
            data[plannerIndex].Data[cardIndex].Title.name = headerData.name;
            data[plannerIndex].Data[cardIndex].Title.color = headerData.color;
        }
        localStorage.removeItem('LeapData');
        localStorage.setItem('LeapData', JSON.stringify(data));
    }
    console.log("Update task header data ended.");
};

export const AddNewTask = (tasks, taskCardId, plannerId) => {
    console.log("Added new task started.");
    const data = JSON.parse(localStorage.getItem('LeapData'));
    const plannerIndex = data.findIndex(x => x.PlannerId == plannerId);
    if (plannerIndex >= 0) {
        const cardIndex = data[plannerIndex].Data.findIndex(x => x.CardId == taskCardId);
        if (cardIndex >= 0) {
            data[plannerIndex].Data[cardIndex].Tasks = tasks;
        }
        localStorage.removeItem('LeapData');
        localStorage.setItem('LeapData', JSON.stringify(data));
    }
    console.log("Added new task ended.");
};





export const AddNewTaskCard = (plannerId) => {
    console.log("Add new task started.");
    const data = JSON.parse(localStorage.getItem('LeapData'));
    const plannerIndex = data.findIndex(x => x.PlannerId == plannerId);  
    if (plannerIndex >= 0) {
        const newCard = {
            "CardId": data[plannerIndex].Data[data[plannerIndex].Data.length - 1]?.CardId + 1,
            "Title": {
                "name": "",
                "color": ""
            },
            "Tasks": [
                {
                    "id": 1,
                    "isChecked": false,
                    "text": ""
                }
            ]
        };
        data[plannerIndex].Data.push(newCard);
        localStorage.removeItem('LeapData');
        localStorage.setItem('LeapData', JSON.stringify(data));
    }   
    console.log("Add new task ended.");
};

export const DeleteTaskCard = (plannerId, cardId) => {
    console.log("delete task card started.");
    let data = JSON.parse(localStorage.getItem('LeapData'));
    const plannerIndex = data.findIndex(x => x.PlannerId == plannerId);  
    if (plannerIndex >= 0) {   
        const cardIndex =  data[plannerIndex].Data.findIndex(x => x.CardId == cardId)
        data[plannerIndex].Data.splice(cardIndex, 1);
        localStorage.removeItem('LeapData');
        localStorage.setItem('LeapData', JSON.stringify(data));
        if(data[plannerIndex].Data.length <= 0){
            AddNewTaskCard(plannerId);
        }
        
    }   
    console.log("delete task card ended.");
};