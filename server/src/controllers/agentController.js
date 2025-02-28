import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Prisma from "../utils/prisma.js";
import { generateAccessToken, generateRefreshToken } from "../utils/agentTokens.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateRefreshAndAccessTokens=async(existedAgent)=>{
    try{
        console.log(existedAgent);
        const accessToken = generateAccessToken(existedAgent);
        const refreshToken=generateRefreshToken(existedAgent);
        existedAgent.refresh_token=refreshToken;
        await Prisma.agent.update({
            where:{
                agent_id:existedAgent.agent_id
            },
            data:{
                refresh_token: refreshToken
            }
        })

        return{refreshToken,accessToken};
    }
    catch(error){
        throw new ApiError(500,"something went wrong in creating refresh and access token");
    }
}

const createAgent = asyncHandler(async(req,res)=>{
    var{
        full_name,
        phone_num,
        email,
        address,
        pincode,
        city,
        state,
        bank_details,
        security_deposit,
        payment_mode
    }=req.body;

    console.log("inside agent create controller")

    try {
        if (!full_name || full_name.trim() === '') {
            throw new ApiError(400, "Full name is required");
        }
        if (!/^[a-zA-Z\s]+$/.test(full_name)) {
            throw new ApiError(400, "Full name can only contain alphabets and spaces");
        }
        if (!phone_num || !/^\d{10}$/.test(phone_num)) {
            throw new ApiError(400, "Phone number must be exactly 10 digits");
        }
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            throw new ApiError(400, "Invalid email format");
        }
        if (!address || address.trim() === '') {
            throw new ApiError(400, "Location is required");
        }
        if (!pincode || pincode.trim() === '') {
            throw new ApiError(400, "Location is required");
        }
        if (!city || city.trim() === '') {
            throw new ApiError(400, "Location is required");
        }
        if (!state || state.trim() === '') {
            throw new ApiError(400, "Location is required");
        }
        if (!bank_details) {
            throw new ApiError(400, "Bank details are required.");
        }
        if (!bank_details || !/^\d{6,18}$/.test(bank_details)) {
            throw new ApiError(400, "Invalid bank account number. It should be between 6 to 18 digits.");
        }
        if(!security_deposit)
        {
            throw new ApiError(400,"Security deposit is no entered");
        }
        if(!payment_mode)
        {
            throw new ApiError(400,"Enter the payment mode");
        }
        if(!payment_mode=='CASH' || !payment_mode=='DIGITAL')
        {
            throw new ApiError(400,"Enter valid payment mode");
        }

        const agent = await Prisma.agent.findUnique({
            where: {
                phone_num: phone_num
            }
        });
        
        if(agent){
            throw new ApiError(400, "Agent phone number already  exists");
        }

        const newAgent=await Prisma.agent.create({
            data: {
                full_name,
                phone_num,
                email,
                address,
                pincode,
                city,
                state,
                bank_details,
            }
        })
        await Prisma.agentAdminTransaction.create({
            data:{
                agent_id:newAgent.agent_id,
                security_deposit_amt:security_deposit,
                isPending:"PENDING",
                payment_mode:payment_mode
            }
        })
        console.log("new agent",newAgent);

        res.status(200).json(
            new ApiResponse(200, "Agent registered successfully")
        )        
}
 catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
}
})

const loginAgent = asyncHandler(async(req,res)=>{
    const{phone_num}=req.body;
    if(!phone_num){
        throw new ApiError(400,"Phone number is not entered");
    }
    const existedAgent=await Prisma.agent.findUnique({
        where:{
            phone_num
        }
    })

    if(!existedAgent){
        throw new ApiError(404,"Agent not exists");
    }

    const {refreshToken,accessToken}=await generateRefreshAndAccessTokens(existedAgent);
    console.log(refreshToken);
    console.log(accessToken);
    
    
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                agent: existedAgent
            },
            "User logged in successfully"
        )
    )
})

const logoutAgent=asyncHandler(async(req,res)=>{
    await Prisma.agent.update({
        where:{
            agent_id:agent.agent_id
        },
        data:{
            refreshToken:null
        }
    })

    const options={
        httpOnly:true,
        secure:true
    }
    
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"Agent logged out"))
})

export  {createAgent,loginAgent,logoutAgent}