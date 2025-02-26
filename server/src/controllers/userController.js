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
    const validStates = [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
      "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
      "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
      "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
      "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
      "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi", "Lakshadweep", "Puducherry", "Jammu & Kashmir", "Ladakh"
    ];
    if (!state) {
      throw new ApiError(400, "State Field is empty");
    }
    if (!validStates.includes(state)) {
      throw new ApiError(400, "Enter appropriate State")
    }

    const stateCities = {
      "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore", "Kurnool", "Rajahmundry", "Kadapa", "Anantapur"],
      "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat", "Bomdila", "Roing", "Daporijo"],
      "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur", "Tinsukia", "Nagaon"],
      "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Begusarai", "Arrah", "Bettiah"],
      "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Bhilai", "Korba", "Jagdalpur", "Ambikapur"],
      "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
      "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Jamnagar", "Junagadh", "Anand"],
      "Haryana": ["Chandigarh", "Faridabad", "Gurugram", "Panipat", "Ambala", "Hisar", "Rohtak", "Yamunanagar"],
      "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Mandi", "Kullu", "Chamba", "Solan", "Bilaspur"],
      "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih"],
      "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi", "Davangere", "Shivamogga", "Ballari"],
      "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Kannur", "Alappuzha"],
      "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Satna", "Sagar", "Ratlam"],
      "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Latur"],
      "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Kakching", "Ukhrul", "Senapati"],
      "Meghalaya": ["Shillong", "Tura", "Nongstoin", "Jowai", "Williamnagar"],
      "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Saiha", "Kolasib"],
      "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Mon", "Zunheboto"],
      "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur", "Puri", "Balasore", "Jeypore"],
      "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur"],
      "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bharatpur"],
      "Sikkim": ["Gangtok", "Namchi", "Mangan", "Gyalshing", "Jorethang"],
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore"],
      "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahbubnagar"],
      "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar", "Ambassa"],
      "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Moradabad", "Gorakhpur"],
      "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Nainital", "Roorkee", "Kashipur"],
      "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol", "Kharagpur", "Haldia"],

      // Union Territories
      "Andaman and Nicobar Islands": ["Port Blair"],
      "Chandigarh": ["Chandigarh"],
      "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
      "Delhi": ["New Delhi"],
      "Lakshadweep": ["Kavaratti"],
      "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
      "Jammu & Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
      "Ladakh": ["Leh", "Kargil"]
    };
    if (!city) {
      throw new ApiError(400, "City field is empty");
    }
    if (!stateCities[state].includes(city)) {
      throw new ApiError(400, "Enter Appropriate City");
    }

    const user = await Prisma.user.findUnique({
      where: {
        phone_number: phone_number,
      },
    });

    const saltRounds = 10;
    const hashedPin = await bcrypt.hash(user_pin, saltRounds);

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


export { createUser, loginUser, logoutUser, totalAgent, notificationToUser };


