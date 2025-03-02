import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Prisma from "../utils/prisma.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/agentTokens.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import nodemailer from "nodemailer";
import { generateWalletId } from "./userController.js";
import bcrypt from "bcrypt";
import instance from "../utils/razorpay.js";

const generateRefreshAndAccessTokens = async (existedAgent) => {
  try {
    console.log(existedAgent);
    const accessToken = generateAccessToken(existedAgent);
    const refreshToken = generateRefreshToken(existedAgent);
    existedAgent.refresh_token = refreshToken;
    await Prisma.agent.update({
      where: {
        agent_id: existedAgent.agent_id,
      },
      data: {
        refresh_token: refreshToken,
      },
    });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong in creating refresh and access token"
    );
  }
};

const createAgent = asyncHandler(async (req, res) => {
    var {
        full_name,
        phone_num,
        password,
        email,
        address,
        pincode,
        city,
        state,
        bank_details,
        security_deposit,
        payment_mode,
        agent_pin
    } = req.body;
    bank_details = bank_details.toString();
    console.log("inside agent create controller")

    try {
        if (!full_name || full_name.trim() === '') {
            throw new ApiError(400, "Full name is required");
        }
        if (!password) {
            throw new ApiError(400, "Passowrd is required")
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
        if (!security_deposit) {
            throw new ApiError(400, "Security deposit is no entered");
        }
        if (!payment_mode) {
            throw new ApiError(400, "Enter the payment mode");
        }
        if (!payment_mode == 'CASH' || !payment_mode == 'DIGITAL') {
            throw new ApiError(400, "Enter valid payment mode");
        }
        if (!agent_pin || !(agent_pin < 4 || agent_pin > 4)) {
            throw new ApiError(400, "Pin must be of 4 digit");
        }
        const Agent = await Prisma.agent.findUnique({
            where: {
                phone_num: phone_num
            }
        });

        if (Agent) {
            throw new ApiError(400, "Agent phone number already  exists");
        }
        const saltRounds = 10
        password = await bcrypt.hash(password, saltRounds);

        const newAgent = await Prisma.agent.create({
            data: {
                full_name,
                phone_num,
                email,
                password,
                address,
                pincode,
                city,
                state,
                bank_details,
                password,
            }
        })

        console.log("new agent", newAgent);
        


        res.status(200).json(
            new ApiResponse(200,"Agent registered successfully")
        )
    }
    catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
    }
})

const createOrder = asyncHandler(async (req, res) => {
    const { security_deposit } = req.body;
    console.log(process.env.RAZORPAY_KEY_ID);
    const options = {
        amount: security_deposit * 100,
        currency: "INR"
    }
    // console.log(instance.)
    console.log("sqGhqsSQ")
    const payment = await instance.orders.create(options);
    console.log("payment in back", payment);
    res.status(200).json(
        new ApiResponse(200, {security_deposit:payment},"Agent registered successfully")
    )
});

const loginAgent = asyncHandler(async (req, res) => {
  const { phone_num, password } = req.body;
  if (!phone_num || !password) {
    throw new ApiError(400, "Phone number and password is not entered");
  }
  const existedAgent = await Prisma.agent.findUnique({
    where: {
      phone_num,
    },
  });

  if (!existedAgent) {
    throw new ApiError(404, "Agent not exists");
  }
  //  const isPasswordValid = await bcrypt.compare(password, existedAgent.password);
  if (existedAgent.password != password) {
    throw new ApiError(400, "Invalid password");
  }

  const { refreshToken, accessToken } = await generateRefreshAndAccessTokens(
    existedAgent
  );
  console.log(refreshToken);
  console.log(accessToken);

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          agent: existedAgent,
        },
        "Agent logged in successfully"
      )
    );
});

const logoutAgent = asyncHandler(async (req, res) => {
  await Prisma.agent.update({
    where: {
      agent_id: agent.agent_id,
    },
    data: {
      refreshToken: null,
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
    .json(new ApiResponse(200, {}, "Agent logged out"));
});

const createWallet = asyncHandler(async (req,res)=>{
    const {agent_id,agent_pin} = req.body;

    if(!agent_id)
    {
        throw new ApiError(400,"agent ID is required");
    }
    if(!agent_pin)
    {
        throw new ApiError(400,"agent pin is required");
    }

    await Prisma.agentWallet.create({
        data:{
            wallet_id:generateWalletId+"-AGENT",
            agent_id:agent_id,
            agent_pin:agent_pin
        }
    })

    res.status(200).json(
        new ApiResponse(
            200,
            "wallet created successfully"
        )
    )
})

const getKey = asyncHandler(async(req,res)=>{
    const key = process.env.RAZORPAY_KEY_ID
    res.status(200).json(
        new ApiResponse(200,{key:key},"key fetched successfully")
    )
})



// Get agent by ID
const getAgentById = asyncHandler(async (req, res) => {
  const { agent_id } = req.params;

  if (!agent_id) {
    throw new ApiError(400, "Agent ID is required");
  }

  try {
    const agent = await Prisma.agent.findUnique({
      where: {
        agent_id: agent_id,
      },
    });

    if (!agent) {
      throw new ApiError(404, "Agent not found");
    }

    // Remove sensitive information
    const { password, refresh_token, ...agentData } = agent;

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { agent: agentData },
          "Agent details fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to fetch agent details"
    );
  }
});

// Get agent wallet by agent ID
const getAgentWalletByAgentId = asyncHandler(async (req, res) => {
  const { agent_id } = req.params;

  if (!agent_id) {
    throw new ApiError(400, "Agent ID is required");
  }

  try {
    const agentWallet = await Prisma.agentWallet.findUnique({
      where: {
        agent_id: agent_id,
      },
    });

    if (!agentWallet) {
      throw new ApiError(404, "Agent wallet not found");
    }

    // Remove sensitive information
    const { agent_pin, ...walletData } = agentWallet;

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { wallet: walletData },
          "Agent wallet details fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to fetch agent wallet details"
    );
  }
});

export {
  createAgent,
  loginAgent,
  logoutAgent,
  createWallet,
  getKey,
  createOrder,
  getAgentById,
  getAgentWalletByAgentId,
};
