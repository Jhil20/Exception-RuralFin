import jwt from "jsonwebtoken";
import Prisma from "./prisma.js"
import { UsageRecordInstance } from "twilio/lib/rest/supersim/v1/usageRecord.js";

const generateAccessToken = function (agent) {
    return jwt.sign(
        {
            agent_id:agent.agent_id,
            email:agent.email,
            phone_num:agent.phone_num,
            full_name:agent.full_name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

const generateRefreshToken = function (agent) {
    return jwt.sign(
        {
            agent_id:agent.agent_id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export {generateAccessToken,generateRefreshToken};