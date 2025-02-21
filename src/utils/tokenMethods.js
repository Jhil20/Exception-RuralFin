import jwt from "jsonwebtoken";
import Prisma from "../utils/prisma.js"

const generateAccessToken = function (user) {
    return jwt.sign(
        {
            user_id:user.user_id,
            email:user.email,
            password_hash:user.phone_number,
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