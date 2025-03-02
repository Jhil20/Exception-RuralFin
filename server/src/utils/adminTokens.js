import jwt from "jsonwebtoken";
import Prisma from "../utils/prisma.js"
import { UsageRecordInstance } from "twilio/lib/rest/supersim/v1/usageRecord.js";

const generateAccessToken = function (admin) {
    return jwt.sign(
        {
            admin_id:admin.admin_id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const generateRefreshToken = function (admin) {
    return jwt.sign(
        {
            admin_id:admin.admin_id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export {generateAccessToken,generateRefreshToken};