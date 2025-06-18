import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
 import { Button } from '@mui/material';
 import { Link } from 'react-router';

import logo from "../../assets/logo.PNG";
import wallpaper from "../../assets/bg1.jpg";
import { useState } from 'react';

import {GenerateOtp} from "./APICall.js";

export default function FP_Email(props){

    const [email, setEmail] = useState('');

    const [isValidEmail, setIsValidEmail] = useState({"isValid" : true, "errorMsg" : ""});

    const [isFailed, setIsFailed] = useState({"failed" : false, "msg" : ""});
    let canSendRequest = false;


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const HandleSubmitButton = async () =>{

        CheckEmpty(email, setIsValidEmail, "Email");
        if(email !== "" && canSendRequest){
            const response = await GenerateOtp(email);
            if(response == null || (response.status === "Failed" && response.errorMessage !== "InvalidProcess"))
            {
                setIsFailed({"failed" : true, "msg" : "Failed to process your request. Try after some time."});
            }
            else if(response.status === "Failed" && response.errorMessage === "InvalidProcess")
            {
                setIsFailed({"failed" : true, "msg" : "This Email is not registered."});
            }
            else
            {
                props.setEmail(email);
                props.setComponent("FP_otp");
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
                        <Button variant="contained" sx = {{width : "60%", padding : "1.5%"}} onClick={HandleSubmitButton}>Send OTP</Button>
                        <Typography align="center" component="p" sx={{marginTop : "1vh"}}>
                            <Link to="/Login">Back to log in ?</Link>
                        </Typography>
                    </div>
                </Box>
            </Container>
        </div>
    );
}