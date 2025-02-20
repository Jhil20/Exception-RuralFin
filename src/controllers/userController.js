
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import Prisma from "../utils/prisma.js"
import bcrypt from "bcrypt";


const createUser = asyncHandler(async (req, res) => {
    var { full_name,
        phone_number,
        email,
        password_hash,
        age,
        income,
        budget_limit
    } = req.body;

    try {
        if (!full_name || full_name.trim() === '') {
            throw new ApiError(400, "Full name is required");
        }
        if (!/^[a-zA-Z\s]+$/.test(full_name)) {
            throw new ApiError(400, "Full name can only contain alphabets and spaces");
        }
        if (!phone_number || !/^\d{10}$/.test(phone_number)) {
            throw new ApiError(400, "Phone number must be exactly 10 digits");
        }
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            throw new ApiError(400, "Invalid email format");
        }
        if (!password_hash || password_hash.length < 8) {
            throw new ApiError(400, "Password must be at least 8 characters long");
        }
        if (!/[A-Z]/.test(password_hash) || !/[a-z]/.test(password_hash) || !/[0-9]/.test(password_hash) || !/[!@#$%^&*]/.test(password_hash)) {
            throw new ApiError(400, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        }
        if (!age || isNaN(age) || age < 18 || age > 100) {
            throw new ApiError(400, "Age must be a number between 18 and 100");
        }
        if (!income || isNaN(income) || income < 0 || income > 10000000) {
            throw new ApiError(400, "Income must be a positive number up to 10,000,000");
        }
        if (!budget_limit || isNaN(budget_limit) || budget_limit < 0) {
            throw new ApiError(400, "Budget limit must be a positive number");
        }
        if (budget_limit > income) {
            throw new ApiError(400, "Budget limit cannot be greater than income");
        }
        
        const user = await Prisma.user.findUnique({
            where:{
                email: email.toLowerCase()
            }
        });
        password_hash = await bcrypt.hash(password_hash,10)
        console.log(password_hash);
        
        if(user)
        {
            throw new ApiError(400,"User already exits");
        }
        await Prisma.user.create({
            data:{
                full_name,
                phone_number,
                email,
                password_hash,
                age,    
                income,
                budget_limit
            }
        })
        res.status(200).json(
            new ApiResponse(200,"user registered successfully")
        )

    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
        
    }

})

const loginUser = asyncHandler(async (req,res)=>{
    const {phone_number,password} = req.body;
    if(!phone_number){
        throw new ApiError(400,"Phone number is not entered");
    }
    const user = await Prisma.user.findUnique({
        where:{
            phone_number
        }
    })
    if(!user){
        throw new ApiError(404,"User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password,user.password_hash)
    if(!isPasswordValid)
    {
        throw new ApiError(401,"Incorrect password");
    }
    const userCopy = {...user}
    delete userCopy.password_hash;
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user:userCopy
            },
            "User logged in successfully"
        )
    )
})


export { createUser, loginUser }