import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenMethods.js";
import Prisma from "../utils/prisma.js";
import bcrypt from "bcrypt"


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
  var { full_name, phone_number, email, age, income, gender, budget_limit, address, pincode, state, city, user_pin } =
    req.body;


  try {
    
    const user = await Prisma.user.findUnique({
      where: {
        phone_number: phone_number,
      },
    });
    console.log("user in back",user,user_pin)
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

    await Prisma.UserWallet.create({
      data: {
        wallet_id: generateWalletId(),
        user_id: newUser.user_id,
        user_pin: hashedPin || null
      }
    });

    console.log("uset", newUser);
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

const userActivity = asyncHandler(async (user_id) => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  // Example: "2025-02-26"

  const activityPerDayAgent = await Prisma.userAgentTransaction.count({
    where: {
      user_id: user_id,
      date_time: {
        gte: new Date(today + "T00:00:00.000Z"),
        lt: new Date(today + "T23:59:59.999Z")
      }
    }
  })
  const activityPerDayUser = await Prisma.peerToPeerTransaction.count({
    where: {
      user_id: user_id,
      date_time: {
        gte: new Date(today + "T00:00:00.000Z"),
        lt: new Date(today + "T23:59:59.999Z")
      }
    }
  })
  let totalTransactionPerDay = activityPerDayAgent + activityPerDayUser;
})

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

const notificationToUser = asyncHandler(async (req, res) => {
  const { user_id, receipent_wallet_id, amount } = req.body;
  const receipent_id = await Prisma.userWallet.findUnique({
    where: {
      wallet_id: receipent_wallet_id
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
      message: `${amount} is sent`
    }
  })
  await Prisma.notificationUser.create({
    data: {
      sender: {
        connect: {
          user_id: receipent_id.user_id
        }
      },
      receipent: {
        connect: {
          user_id: user_id
        }
      },
      message: `${amount} is received`
    }
  })
  res.status(200).json(
    new ApiResponse(
      200,
      "Agent is notified"
    )
  )
})


export { createUser, loginUser, logoutUser, totalAgent, notificationToUser ,getAllUsers};


