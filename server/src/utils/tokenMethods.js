import jwt from "jsonwebtoken";
import Prisma from "./prisma.js"
import { UsageRecordInstance } from "twilio/lib/rest/supersim/v1/usageRecord.js";

const generateAccessToken = function (user) {
    return jwt.sign(
        {
            user_id:user.user_id,
            email:user.email,
            phone_number:user.phone_number.toString(),
            fullname:user.full_name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const generateRefreshToken = function (user) {
    return jwt.sign(
        {
            user_id:user.user_id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export {generateAccessToken,generateRefreshToken};