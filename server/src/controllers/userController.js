import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenMethods.js";
import Prisma from "../utils/prisma.js";
import bcrypt from "bcrypt"
import { TransactionType } from "@prisma/client";


const generateRefreshAndAccessTokens = async (existedUser) => {
  try {
    // console.log(existedUser)
    const accessToken = generateAccessToken(existedUser);
    const refreshToken = generateRefreshToken(existedUser);
    // console.log("access", accessToken);
    // console.log("refresh", refreshToken);
    existedUser.refresh_token = refreshToken;
    // console.log("existedUSer",existedUser.refresh_token)
    await Prisma.user.update({
      where: {
        user_id: existedUser.user_id,
      },
      data: {
        refresh_token: existedUser.refresh_token,
      },
    });
    // console.log("refresh", refreshToken);
    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong in creating refresh and access token"
    );
  }
};

const generateWalletId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomLetters = "";
  for (let i = 0; i < 3; i++) {
    randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return `${randomLetters}@RURALFIN`;
};



const createUser = asyncHandler(async (req, res) => {
  var { full_name, phone_number, password,email, age, income, gender, budget_limit, address, pincode, state, city, user_pin } =
    req.body;


  try {
    if (!full_name || full_name.trim() === "" || !password) {
      throw new ApiError(400, "Full name is required");
    }
    if (!/^[a-zA-Z\s]+$/.test(full_name)) {
      throw new ApiError(
        400,
        "Full name can only contain alphabets and spaces"
      );
    }
    if (!phone_number || !/^\d{10}$/.test(phone_number)) {
      throw new ApiError(400, "Phone number must be exactly 10 digits");
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      throw new ApiError(400, "Invalid email format");
    }
    if (!age || isNaN(age) || age < 18 || age > 100) {
      throw new ApiError(400, "Age must be a number between 18 and 100");
    }
    if (!income || isNaN(income) || income < 0 || income > 10000000) {
      throw new ApiError(
        400,
        "Income must be a positive number up to 10,000,000"
      );
    }
    if (!budget_limit || isNaN(budget_limit) || budget_limit < 0) {
      throw new ApiError(400, "Budget limit must be a positive number");
    }
    if (budget_limit > income) {
      throw new ApiError(400, "Budget limit cannot be greater than income");
    }
    if (!address) {
      throw new ApiError(400, "Address field is empty");
    }
    if (!pincode) {
      throw new ApiError(400, "pincode is empty");
    }
    if (pincode.length != 6) {
      throw new ApiError(400, "Pincode must be 6 of digit");
    }
    if (!user_pin || !/^\d{4,6}$/.test(user_pin)) {
      throw new ApiError(400, "User PIN must be a 4 to 6 digit number");
    }
    if (!state) {
      throw new ApiError(400, "State Field is empty");
    }
    
    if (!city) {
      throw new ApiError(400, "City field is empty");
    }

    const user = await Prisma.user.findUnique({
      where: {
        phone_number: phone_number,
      },
    });
    // console.log("user in back",user,user_pin)
    const saltRounds = 10;
    const hashedPin = await bcrypt.hash(user_pin, saltRounds);
    console.log("hashed pin", hashedPin);
    if (user) {
      throw new ApiError(400, "User already exists");
    }
    const newUser = await Prisma.user.create({
      data: {
        full_name,
        phone_number,
        email,
        password:hashedPassword,
        age,
        income,
        gender,
        budget_limit,
        pincode,
        address,
        state,
        city
      },
    });

    await Prisma.userWallet.create({
      data: {
        wallet_id: generateWalletId(),
        user_id: newUser.user_id,
        user_pin: hashedPin || null
      }
    });

    // console.log("user", newUser);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {
            user: newUser,
          },
          "User registered in successfully"
        )
      );
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Failed to register user" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { phone_number } = req.body;
  console.log(phone_number);
  if (!/^\d{10}$/.test(phone_number)) {
    throw new ApiError(400, "Phone number must be exactly 10 digits");
  }
  if (!phone_number || !password) {
    throw new ApiError(400, "Phone number and password is not entered");
  }
  const existedUser = await Prisma.user.findUnique({
    where: {
      phone_number,
    },
  });
  if (!existedUser) {
    throw new ApiError(404, "User does not exist");
  }
  console.log(existedUser);
  const { refreshToken, accessToken } = await generateRefreshAndAccessTokens(
    existedUser
  );
  const userCopy = { ...existedUser };
  // console.log(refreshToken);
  userCopy.phone_number = userCopy.phone_number.toString();
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshtoken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: userCopy,
        },
        "User logged in successfully"
      )
    );
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await Prisma.user.findMany({
      select: {
        user_id: true,
        full_name: true,
        phone_number: true,
        email: true,
        age: true,
        income: true,
        gender: true,
        budget_limit: true,
        address: true,
        pincode: true,
        state: true,
        city: true,
        created_at: true,
      },
    });

    res.status(200).json(new ApiResponse(200, { users }, "Users fetched successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, {}, "Failed to fetch users"));
  }
});



const logoutUser = asyncHandler(async (req, res) => {
  console.log(req.user.user_id);

  await Prisma.user.update({
    where: {
      user_id: req.user.user_id,
    },
    data: {
      refresh_token: null,
    },
  });
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out"));
});

const userActivity = asyncHandler(async (req, res) => {
  const user_id = req.body.user_id;
  const today = new Date();

  // Start of the day (00:00:00)
  const startOfDay = new Date(today);
  startOfDay.setUTCHours(0, 0, 0, 0);

  // End of the day (23:59:59)
  const endOfDay = new Date(today);
  endOfDay.setUTCHours(23, 59, 59, 999);

  const activityPerDayAgent = await Prisma.userAgentTransaction.count({
    where: {
      user_id: user_id,
      date_time: {
        gte: startOfDay,
        lt: endOfDay
      }
    }
  });

  const activityPerDayUser = await Prisma.peerToPeerTransaction.count({
    where: {
      sender_id: user_id,
      date_time: {
        gte: startOfDay,
        lt: endOfDay
      }
    }
  });

  let totalTransactionPerDay = activityPerDayAgent + activityPerDayUser;
  
  res.status(200).json(
    new ApiResponse(
      200,
      { Transaction: totalTransactionPerDay },
      "Per day transaction fetched"
    )
  );
});


const totalAgent = asyncHandler(async (req, res) => {
  const allAgent = await Prisma.agent.findMany(
    {
      where: {
        status: "ACTIVE"
      }
    }
  )
  res.status(200).json(new ApiResponse(
    200,
    { agent: allAgent },
    "Agent fetched"
  ))
})

const notificationToUser = asyncHandler(async (req,res)=>{
  const {user_id,receipent_wallet_id,amount} = req.body;
  const receipent_id = await Prisma.UserWallet.findUnique({
    where:{
      wallet_id:receipent_wallet_id
    },
    select: {
      user_id: true
    }
  })
  await Prisma.notificationUser.create({
    data: {
      sender: {
        connect: {
          user_id: user_id
        }
      },
      receipent: {
        connect: {
          user_id: receipent_id.user_id
        }
      },
      message: `${amount} is received`
    }
  })
  
  res.status(200).json(
    new ApiResponse(
      200,
      "notification sent"
    )
  )
})

const getAllUser = asyncHandler(async (req,res)=>{
  const allUser = await Prisma.user.findMany();
  res.status(200).json(
    new ApiResponse(
      200,
      {
        user:allUser
      },
      "All user fetched successfully"
    )
  )
})

const getUserById = asyncHandler(async(req,res)=>{
  // console.log("req body",req.params);
  const user_id = req.params.id;
  // console.log("user_id",user_id);
  if(!user_id)
  {
    throw new ApiError(400,"Enter user Id");
  }
  const userById =await Prisma.user.findUnique({
    where:{
      user_id:user_id
    }
  })

  res.status(200).json(
    new ApiResponse(
      200,
      {
        user:userById
      },
      "User fetched successfully"
    )
  )
})

const getWalletId = asyncHandler(async (req,res)=>{
  const user_id = req.params.id;
  if(!user_id)
  {
    throw new ApiError(400,"Enter user Id");
  }
  const wallet_id_balance = await Prisma.userWallet.findUnique({
    where:{
      user_id:user_id
    },
    select:{
      wallet_id:true,
      user_balance:true
    }
  }) 
  res.status(200).json(
    new ApiResponse(
      200,
      {
        wallet:wallet_id_balance
      },
      "wallet fetched successfully"
    )
  )
})

export { createUser, loginUser, logoutUser, totalAgent, notificationToUser,getAllUser,getUserById,getWalletId,userActivity,generateWalletId };


