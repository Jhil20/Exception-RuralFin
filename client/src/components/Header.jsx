import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { userLoggedin, userLoggedout } from '../redux/slices/signInSlice';
import { Link } from 'react-router-dom';

const Header = () => {

    const isSignedIn = useSelector(state => state.signin.isSignedIn);
    const dispatch = useDispatch();
    const handleClick=()=>{
        if(isSignedIn){
            dispatch(userLoggedout());
        }
        else{
            dispatch(userLoggedin());
        }
    }
    return (
        <div className="bg-blue-600 flex justify-between p-4 shadow-md">
            <h1 className="text-white text-3xl font-bold">Welcome to RuralFin</h1>
            <Link to="/login" className=''>
            <div>
                <h1 className='text-white text-xl font-bold'>
                    SignIn/SignUp
                </h1>
            </div>
            </Link>
        </div>
    );
};

export default Header;