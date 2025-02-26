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
        agent_name,
        agent_phone,
        email,
        location,
        securityDeposit,
        balance
    }=req.body;

    console.log("inside agent create controller")

    try {
        if (!agent_name || agent_name.trim() === '') {
            throw new ApiError(400, "Full name is required");
        }
        if (!/^[a-zA-Z\s]+$/.test(agent_name)) {
            throw new ApiError(400, "Full name can only contain alphabets and spaces");
        }
        if (!agent_phone || !/^\d{10}$/.test(agent_phone)) {
            throw new ApiError(400, "Phone number must be exactly 10 digits");
        }
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            throw new ApiError(400, "Invalid email format");
        }
        if (!location || location.trim() === '') {
            throw new ApiError(400, "Location is required");
        }
        if (isNaN(securityDeposit) || securityDeposit < 500) {
            throw new ApiError(400, "Security deposit must be at least 500.00");
        }
        if (balance < 0) {
            throw new ApiError(400, "Balance cannot be negative");
        }

        // const phone=Number(agent_phone);
        // console.log(phone)

        const agent = await Prisma.agent.findUnique({
            where: {
                agent_phone: agent_phone
            }
        });
        
        if(agent){
            throw new ApiError(400, "Agent phone number already  exists");
        }

        const newAgent=await Prisma.agent.create({
            data: {
                agent_name,
                agent_phone,
                email,
                location,
                securityDeposit,
                balance
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
    const{agent_phone}=req.body;
    if(!agent_phone){
        throw new ApiError(400,"Phone number is not entered");
    }
    const existedAgent=await Prisma.agent.findUnique({
        where:{
            agent_phone
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