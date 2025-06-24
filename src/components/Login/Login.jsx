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
import { useState } from 'react';
import PasswordInput from "./PasswordInput";
import {SignIn} from "./APICall.js";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isValidEmail, setIsValidEmail] = useState({"isValid" : true, "errorMsg" : ""});
    const [isValidPassword, setIsValidPassword] = useState({"isValid" : true, "errorMsg" : ""});

    const [isFailed, setIsFailed] = useState({"failed" : false, "msg" : ""});
    const [isLoading, setIsLoading] = useState(false);

    let canSendRequest = false;
    const navigate = useNavigate();

    if(!isLoading)
    {
        localStorage.removeItem('token');
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const HandleSubmitButton = async () =>
    {
        setIsLoading(true);       
        CheckEmpty(email, setIsValidEmail, "Email");
        CheckEmpty(password, setIsValidPassword, "Password");
        if(email !== "" && password !== "" && canSendRequest){
            const response = await SignIn(email, password);
            if(response == null || (response.status === "Failed" && response.errorMessage !== "InvalidProcess"))
            {
                setIsLoading(false);
                setIsFailed({"failed" : true, "msg" : "Failed to Sign in. Try after some time."});
            }
            else if(response.status === "Failed" && response.errorMessage === "InvalidProcess")
            {
                setIsLoading(false);
                setIsFailed({"failed" : true, "msg" : "Invalid Email And Password"});
            }
            else
            {
                alert(`Beta !!!! Don't use personal or confidential data in this website.`);
                navigate('/Activity');
            }
        }       
    };

    const CheckEmpty = (state, setstate, stateName) => {
        if(state === ""){
            setstate({"isValid" : false, "errorMsg" : `${stateName} can not be empty`})
            canSendRequest = false;
        }
        else if(stateName === "Email"
            && !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)/.test(email.toLowerCase())
        ){
            setstate({"isValid" : false, "errorMsg" : `Enter valid email`})
            canSendRequest = false;
        }
        else if(stateName === "Password"
            && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(state)
        ){
            setstate({"isValid" : false, "errorMsg" : `Enter valid password`});
            canSendRequest = false;
        }
        else{
            setstate({"isValid" : true, "errorMsg" : ""});
            canSendRequest = true;
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
                            Welcome to Leap
                        </Typography>
                        <Typography align="center" component="p">
                           Don't have an account?
                        </Typography>
                        <Typography align="center" component="p" sx={{marginTop : "-3vh"}}>
                            <Link to="/Register">Sign up</Link>
                        </Typography>

                        {isFailed.failed && <Typography align="center" component="p" sx={{color : "Red"}}>
                            {isFailed.msg}
                        </Typography>}
                        

                        <TextField label="Email" variant="outlined"  sx = {{width : "90%"}} value={email} onChange={handleEmailChange}
                            error = {!isValidEmail.isValid} helperText={isValidEmail.errorMsg}/>
                        <PasswordInput label="Password" value={password} onChange={handlePasswordChange}
                            error = {!isValidPassword.isValid} helperText={isValidPassword.errorMsg}/>
                        <Button variant="contained" sx = {{width : "60%", padding : "1.5%"}} onClick={HandleSubmitButton}>
                            Login
                            {isLoading && <CircularProgress color="white" sx={{marginLeft : "7%"}}/>}
                        </Button>
                        <Typography align="center" component="p" sx={{marginTop : "1vh"}}>
                            <Link to="/ForgotPassword">Forgot Password ?</Link>
                        </Typography>
                    </div>
                </Box>
            </Container>
        </div>
    );
}