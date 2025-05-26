import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BACKEND_URL } from '../utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SignedIn } from '../redux/slices/isSignInSlice';


const RazorPay = () => {

    const location=useLocation();
    const formData=location?.state?.data || null;
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useEffect(()=>{
        setTimeout(() => {
            createAgent();
        }, 5000);
    },[formData])

    const createAgent = async () => {
        try{
            const response=await axios.post(`${BACKEND_URL}/api/agent/register`,formData)
            console.log("Response from server",response.data);
            const token = response?.data?.token;
            Cookies.set("token", token, { expires: 1 });
            dispatch(SignedIn());
            navigate('/agentDashboard');
        }catch (error) {
            console.error("Error creating agent:", error);
            // Handle error appropriately
        }
    }

    return (
        <div className='text-center text-3xl font-bold h-[90.7h] w-full'>
            RazorPay Component
        </div>
    );
};

export default RazorPay;