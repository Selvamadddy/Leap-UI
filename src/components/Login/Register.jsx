import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import logo from "../../assets/logo.PNG";
import wallpaper from "../../assets/bg1.jpg";
import { useEffect, useState } from 'react';
import PasswordInput from "./PasswordInput";
import {RegisterUser} from "./APICall.js";

export default function Register(){

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const [isValidEmail, setIsValidEmail] = useState({"isValid" : true, "errorMsg" : ""});
    const [isValidName, setIsValidName] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState({"isValid" : true, "errorMsg" : ""});
    const [isValidComfirmPassword, setIsValidComfirmPassword] = useState({"isValid" : true, "errorMsg" : ""});

    const [isFailed, setIsFailed] = useState({"failed" : false, "msg" : ""});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() =>{alert(`Beta !!!! Don't use personal or confidential data in this website.`);}, []);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const HandleSubmitButton = async () =>
    {     
        CheckEmpty(email, setIsValidEmail, "Email");
        setIsValidName(name !== "");
        CheckEmpty(password, setIsValidPassword, "Password");
        CheckEmpty(ConfirmPassword, setIsValidComfirmPassword, "Confirm Password");
        if(password !== ConfirmPassword)
        {
            setIsValidComfirmPassword({"isValid" : false, "errorMsg" : `Password and Confirm Password should be same`})
        }
        if(email !== "" && name !== "" && password !== "" && ConfirmPassword !== "" && password === ConfirmPassword){
            setIsLoading(true);
            const response = await RegisterUser(email, name, password);
            if(response == null || (response.status === "Failed" && response.errorMessage !== "InvalidProcess"))
            {
                setIsLoading(false);
                setIsFailed({"failed" : true, "msg" : "Failed to register user. Try after some time."});
            }
            else if(response.status === "Failed" && response.errorMessage === "InvalidProcess")
            {
                setIsLoading(false);
                setIsFailed({"failed" : true, "msg" : "Email is already Registered"});
            }
            else
            {
                setIsLoading(false);
                navigate('/Login');
            }
        }       
    };

    const CheckEmpty = (state, setstate, stateName) => {
        if(state === ""){
            setstate({"isValid" : false, "errorMsg" : `${stateName} can not be empty`})
        }
        else if(stateName === "Email"
            && !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)/.test(email.toLowerCase())
        ){
            setstate({"isValid" : false, "errorMsg" : `Enter valid email`})
        }
        else if(stateName === "Password"
            && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(state)
        ){
            setstate({"isValid" : false, "errorMsg" : `Enter valid password`})
        }
        else{
            setstate({"isValid" : true, "errorMsg" : ""});
        }
    }
    

    return(
        <div style = {{backgroundImage : `url(${wallpaper})`,backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%', }}>
            <Container maxWidth="md" >
                <Box
                    display="flex"
                    flexDirection= "column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                    rowGap="3vh"
                >
                    <div style={{display: "flex", flexDirection : "column", rowGap :"3vh", alignItems : "center", 
                        backgroundColor : "white", border : "3px solid rgb(210, 225, 224)", width : "65%", padding : "2%", borderRadius : "2%"}}>
                        
                        <img src={logo} style={{borderRadius : "20%", height : "10vh"} }></img>

                        <Typography align="center" sx={{fontSizeAdjust : "1"}}>
                            Create Account
                        </Typography>
                        <Typography align="center" component="p" sx={{marginTop : "-2vh"}}>
                            Already have an account?
                        </Typography>
                        <Typography align="center" component="p" sx={{marginTop : "-3vh"}}>
                            <Link to="/Login">Sign In</Link>
                        </Typography>

                        {isFailed.failed && <Typography align="center" component="p" sx={{color : "Red"}}>
                            {isFailed.msg}
                        </Typography>}
                        

                        <TextField label="Email" variant="outlined"  sx = {{width : "90%"}} value={email} onChange={handleEmailChange}
                            error = {!isValidEmail.isValid} helperText={isValidEmail.errorMsg}/>
                        <TextField label="User name" variant="outlined"  sx = {{width : "90%"}} value={name} onChange={handleNameChange}
                            error = {!isValidName} helperText={!isValidName && "User name can't be empty"}/>
                        <PasswordInput label="Password" value={password} onChange={handlePasswordChange}
                            error = {!isValidPassword.isValid} helperText={isValidPassword.errorMsg}/>
                        <PasswordInput label="Confirm Password" value={ConfirmPassword} onChange={handleConfirmPasswordChange}
                            error = {!isValidComfirmPassword.isValid} helperText={isValidComfirmPassword.errorMsg}/>
                        <Button variant="contained" sx = {{width : "60%", padding : "1.5%"}} onClick={HandleSubmitButton}>
                            Create Account
                            {isLoading && <CircularProgress color="white" sx={{marginLeft : "7%"}}/>}
                        </Button>

                    </div>
                </Box>
            </Container>
        </div>
    );
}