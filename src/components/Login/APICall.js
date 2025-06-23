
const BaseUrl = "https://localhost:44326/api/";

async function PostRequest(request, apiName){
        const response = await fetch(BaseUrl + apiName, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);
            return data;
        } 
        else {
            console.error('Error:', response.status);
            return null;
        }
}


export async function RegisterUser(email, name, password){
    try {
        const request = {
            "Email" : email,
            "UserName" : name,
            "Password" : password
        };
        return await PostRequest(request, "RegisterUser");
        
    } 
    catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function GenerateOtp(email){
    try {
        const request = {
            "Email" : email,
        };
        return await PostRequest(request, "GenerateOtp");
        
    } 
    catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function SignIn(email, password){
    try {
        const request = {
            "Email" : email,
            "Password" : password
        };
        const response = await PostRequest(request, "Login");

        const savedData = localStorage.getItem('token');
        if (savedData) {
            localStorage.removeItem('token');
        }      
        localStorage.setItem('token', response.token.access_Token);

        return response;
    } 
    catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function ValidateOtp(email, otp){
    try {
        const request = {
            "Email" : email,
            "otp" : otp
        };
        return await PostRequest(request, "ValidateOtp");
    } 
    catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function UpdatePassword(email, password){
    try {
        const request = {
            "Email" : email,
            "Password" : password
        };
        return await PostRequest(request, "UpdatePassword");
    } 
    catch (error) {
        console.error('Error:', error);
        return null;
    }
}