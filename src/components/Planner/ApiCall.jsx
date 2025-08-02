
const BaseUrl = "https://www.leap-myplanner.somee.com/api/";

async function Request(request, apiName, methodName) {
    if (localStorage.getItem("token") == null) {
        navigate('/Login');
        return "UnAuthorized";
    }
    const response = await fetch(BaseUrl + apiName, {
        method: methodName,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(request),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else {
        return null;
    }
}

async function GETRequest(apiName) {
    if (localStorage.getItem("token") == null) {
        return "UnAuthorized";
    }
    const response = await fetch(BaseUrl + apiName, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else {
        return null;
    }
}

export async function GetUserDetails() {
    try {
        return await GETRequest("GetUserDetails");
    }
    catch (error) {
        return null;
    }
}

export async function GetAllPlanners() {
    try {
        return await GETRequest("planner/GetAllPlanners");
    }
    catch (error) {
        return null;
    }
}

export async function AddPlanner() {
    try {
        return await Request({ "name": "My Planner" }, "planner/AddPlanner", "POST");
    }
    catch (error) {
        return null;
    }
}

export async function DeletePlanner(plannerId) {
    try {
        return await Request({ "id": plannerId }, "planner/DeletePlanner", "DELETE");
    }
    catch (error) {
        return null;
    }
}

export async function UpdatePlanner(plannerId, plannerName) {
    try {
        return await Request({ "id": plannerId, "name": plannerName }, "planner/UpdatePlanner", "PUT");
    }
    catch (error) {
        return null;
    }
}


// Task Cards API's

export async function GetAllTaskCards(plannerId) {
    try {
        return await Request({ "plannerId": plannerId }, "taskcard/GetAllTaskCards", "POST");
    }
    catch (error) {
        return null;
    }
}

export async function AddTaskCard(plannerId) {
    try {
        return await Request({ "plannerId": plannerId }, "taskcard/AddTaskCard", "POST");
    }
    catch (error) {
        return null;
    }
}

export async function UpdateTaskCard(taskCardData) {
    try {
        return await Request({ "id": taskCardData.id, "name": taskCardData.name, "colour": taskCardData.headerColour }, "taskcard/UpdateTaskCard", "PUT");
    }
    catch (error) {
        return null;
    }
}

export async function DeleteTaskCard(cardId) {
    try {
        return await Request({ "id": cardId }, "taskcard/DeleteTaskCard", "DELETE");
    }
    catch (error) {
        return null;
    }
}

//  Task

export async function GetAllTask(cardId) {
    try {
        return await Request({ "taskcardid": cardId }, "task/GetAllTask", "POST");
    }
    catch (error) {
        return null;
    }
}

export async function AddTask(cardId) {
    try {
        return await Request({ "taskcardid": cardId }, "task/AddTask", "POST");
    }
    catch (error) {
        return null;
    }
}

export async function DeleteTask(taskId) {
    try {
        return await Request({ "id": taskId }, "task/DeleteTask", "DELETE");
    }
    catch (error) {
        return null;
    }
}

export async function UpdateTask(taskData) {
    try {
        return await Request({ "id": taskData.id, "text": taskData.taskText, "isChecked": taskData.isChecked }, "task/UpdateTask", "PUT");
    }
    catch (error) {
        return null;
    }
}