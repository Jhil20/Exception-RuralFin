import jwt from "jsonwebtoken";
import Prisma from "../utils/prisma.js"
import { UsageRecordInstance } from "twilio/lib/rest/supersim/v1/usageRecord.js";

const generateAccessToken = function (agent) {
    return jwt.sign(
        {
            agent_id:agent.agent_id,
            email:agent.email,
            agent_phone:agent.agent_phone.toString(),
            agent_name:agent.agent_name
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