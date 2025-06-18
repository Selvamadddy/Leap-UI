import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
 import { Button } from '@mui/material';
 import { Link } from 'react-router';
 import { useNavigate } from 'react-router';

import logo from "../../assets/logo.PNG";
import wallpaper from "../../assets/bg1.jpg";
import { useState } from 'react';

import PasswordInput from "./PasswordInput";
import {UpdatePassword} from "./APICall.js";

export default function FP_UpdatePassword(props){
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const [isValidPassword, setIsValidPassword] = useState({"isValid" : true, "errorMsg" : ""});
    const [isValidComfirmPassword, setIsValidComfirmPassword] = useState({"isValid" : true, "errorMsg" : ""});

    const [isFailed, setIsFailed] = useState({"failed" : false, "msg" : ""});
    let canSendRequest = false;

    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const HandleSubmitButton = async () =>{

        CheckEmpty(password, setIsValidPassword, "Password");
        CheckEmpty(ConfirmPassword, setIsValidComfirmPassword, "Confirm Password");
        if(password !== ConfirmPassword)
        {
            setIsValidComfirmPassword({"isValid" : false, "errorMsg" : `Password and Confirm Password should be same`})
            canSendRequest = false;
        }
        if(password !== "" && ConfirmPassword !== "" && password === ConfirmPassword && canSendRequest){
            const response = await UpdatePassword(props.email, password);
            if(response == null || response.status === "Failed")
            {
                setIsFailed({"failed" : true, "msg" : "Failed to Update password. Try after some time."});
            }
            else
            {
                navigate('/Login');
            }
        }       
    };

    const CheckEmpty = (state, setstate, stateName) => {
        if(state === ""){
            setstate({"isValid" : false, "errorMsg" : `${stateName} can not be empty`})
            canSendRequest = false;
        }
        else if(stateName === "Password"
            && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(state)
        ){
            setstate({"isValid" : false, "errorMsg" : `Enter valid password`})
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
                            Restore Password
                        </Typography>

                        {isFailed.failed && <Typography align="center" component="p" sx={{color : "Red"}}>
                            {isFailed.msg}
                        </Typography>}
                        
                        <PasswordInput label="Password" value={password} onChange={handlePasswordChange}
                            error = {!isValidPassword.isValid} helperText={isValidPassword.errorMsg}/>
                        <PasswordInput label="Confirm Password" value={ConfirmPassword} onChange={handleConfirmPasswordChange}
                            error = {!isValidComfirmPassword.isValid} helperText={isValidComfirmPassword.errorMsg}/>
                        <Button variant="contained" sx = {{width : "60%", padding : "1.5%"}} onClick={HandleSubmitButton}>Update Password</Button>

                        <Typography align="center" component="p">
                            <Link to="/Login">Sign In</Link>
                        </Typography>
                    </div>
                </Box>
            </Container>
        </div>
    );
}