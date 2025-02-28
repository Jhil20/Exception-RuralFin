import { generateRefreshToken } from "../utils/adminTokens.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessToken } from "../utils/adminTokens.js";
import Prisma from "../utils/prisma.js"
import transporter from "../utils/emailTransporter.js";
import hbs from "nodemailer-express-handlebars";


const generateRefreshAndAccessToken=async(existedAdmin)=>{
    try{
        const accessToken=generateAccessToken(existedAdmin);
        const refreshToken=generateRefreshToken(existedAdmin);
        await Prisma.admin.update({
            where:{
                admin_id:existedAdmin.admin_id
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



const loginAdmin=asyncHandler(async(req,res)=>{
    
    const {admin_id}=req.body;

    if(!admin_id){
        throw new ApiError(400, "Admin Id is not entered");
    }
    if (admin_id !== "4323") {
        throw new ApiError(403, "Invalid Admin ID");
    }

    const existedAdmin = await Prisma.admin.findUnique({ where: { admin_id } });
    if (!existedAdmin) {
        throw new ApiError(404, "Admin does not exist");
    }

    const {refreshToken,accessToken}=await
    generateRefreshAndAccessToken(existedAdmin);
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
                admin: existedAdmin
            },
            "Admin logged in successfully"
        )
    )
})

const logoutAdmin=asyncHandler(async(req,res)=>{
    await Prisma.admin.update({
        where:{
            admin_id:admin.admin_id
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
    .json(new ApiResponse(200,{},"Admin logged out"))
})

const allPendingAgents = asyncHandler(async (req,res)=>{
    const pendingAgents = await Prisma.agent.findMany({
        where:{
            status:"INACTIVE"
        }
    })
    console.log(pendingAgents);
    
    res.status(200).json(
        new ApiResponse(
            200,
            {
                Agents : pendingAgents
            },
            "Pending agents fetched successfully"
        )
    )
})

const acceptPendingAgents = asyncHandler(async (req,res) => {
    const {email,agent_id} = req.body;
    const mailOptions = {
        from: 'Ruralfin@gmail.com', // Sender address
        to: email, // List of recipients
        subject: 'Approval from Admin, RuralFin', // Subject line
        html: '<h2 style="color:#ff6600;">Hello People!, Welcome to Bacancy!</h2>',
    };

    await Prisma.agent.update({
        where:{
            agent_id:agent_id
        },
        data:{
            status:"ACTIVE"
        }
    })

    transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
        console.log(err)
    } else {
        console.log(info);
    }
    res.status(200).json(
        new ApiResponse(
            200,"mail sent successfully and agent accepted"
        )
    )
    })
})

export {loginAdmin,logoutAdmin,allPendingAgents,acceptPendingAgents};