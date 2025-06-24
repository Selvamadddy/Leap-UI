import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import logo from "../../assets/logo.PNG";
import wallpaper from "../../assets/bg1.jpg";
import { useState } from 'react';
import {ValidateOtp} from "./APICall.js";

export default function FP_otp(props){

    const [otp, setotp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isValidotp, setIsValidotp] = useState({"isValid" : true, "errorMsg" : ""});
    const [isFailed, setIsFailed] = useState({"failed" : false, "msg" : ""});
    let canSendRequest = false;

    const handleotpChange = (event) => {
        setotp(event.target.value);
    };

    const HandleSubmitButton = async () =>{
        CheckEmpty(otp, setIsValidotp, "OTP");
        if(otp !== "" && canSendRequest){
            setIsLoading(true);
            const response = await ValidateOtp(props.email, otp);
            if(response == null || (response.status === "Failed" && response.errorMessage !== "InvalidProcess"))
            {
                setIsLoading(false);
                setIsFailed({"failed" : true, "msg" : "Failed to process your request. Try after some time."});
            }
            else if(response.status === "Failed" && response.errorMessage === "InvalidProcess")
            {
                setIsLoading(false);
                setIsFailed({"failed" : true, "msg" : "Invalid OTP."});
            }
            else
            {
                setIsLoading(false);
                props.setComponent("FP_UpdatePassword");
            }
        }       
    };

    const CheckEmpty = (state, setstate, stateName) => {
        if(state === ""){
            setstate({"isValid" : false, "errorMsg" : `${stateName} can not be empty`})
            canSendRequest = false;
        }
        else if(state.length != 6){
            setstate({"isValid" : false, "errorMsg" : `Enter valid otp`})
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
                           OTP is send to your email.<br/> Valid till 5 minutes.
                        </Typography>

                        {isFailed.failed && <Typography align="center" component="p" sx={{color : "Red"}}>
                            {isFailed.msg}
                        </Typography>}
                        

                        <TextField label="OTP" variant="outlined"  sx = {{width : "90%"}} value={otp} onChange={handleotpChange}
                            error = {!isValidotp.isValid} helperText={isValidotp.errorMsg}/>

                        <Button variant="contained" sx = {{width : "60%", padding : "1.5%"}} onClick={HandleSubmitButton}>
                            Submit
                            {isLoading && <CircularProgress color="white" sx={{marginLeft : "7%"}}/>}
                        </Button>
                        <Typography align="center" component="p" sx={{marginTop : "1vh"}}>
                            <Link to="/Login">Back to log in ?</Link>
                        </Typography>
                    </div>
                </Box>
            </Container>
        </div>
    );
}