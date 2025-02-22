import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenMethods.js";
import Prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";

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

const createUser = asyncHandler(async (req, res) => {
  var { full_name, phone_number, email, age, income, gender, budget_limit } =
    req.body;

  try {
    if (!full_name || full_name.trim() === "") {
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
    console.log("in back register");

    const user = await Prisma.user.findUnique({
      where: {
        phone_number: phone_number,
      },
    });

    if (user) {
      throw new ApiError(400, "User phone number already exists");
    }
    const newUser = await Prisma.user.create({
      data: {
        full_name,
        phone_number,
        email,
        age,
        income,
        gender,
        budget_limit,
      },
    });

    const { refreshToken, accessToken } = await generateRefreshAndAccessTokens(
      newUser
    );
    const userCopy = { ...newUser };
    console.log(refreshToken);
    userCopy.phone_number = userCopy.phone_number.toString();
    const options = {
      httpOnly: true,
      secure: true,
    };

    console.log("uset", newUser);
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
        "User registered in successfully"
      )
    );
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { phone_number } = req.body;
  console.log(phone_number);
  if (!phone_number) {
    throw new ApiError(400, "Phone number is not entered");
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
  console.log(refreshToken);
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

export { createUser, loginUser, logoutUser };
