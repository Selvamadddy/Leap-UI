import FP_Email from "./FP_Email";
import FP_otp from "./FP_otp";
import FP_UpdatePassword from "./FP_UpdatePassword";
import { useState } from 'react';

export default function ForgotPassword(){
    const [component, setComponent] = useState('FP_Email');
    const [email, setEmail] = useState('');

    const moveNext = (name) =>{
        setComponent(name);
    }

    const assignEmail = (email) =>{
        setEmail(email);
    }

    const getComponent = () =>{
        if(component === 'FP_Email'){
             return <FP_Email setComponent = {moveNext} setEmail={assignEmail}/>           
        }
        else if(component === 'FP_otp'){
            return <FP_otp setComponent = {moveNext} email = {email}/>
        }
        else if(component === 'FP_UpdatePassword'){

            return <FP_UpdatePassword setComponent = {moveNext} email = {email}/>
        }
    }
    return(
        <>{getComponent()}</>
        
    );
}