const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../models/userModel"); 

async function generateUniqueUpiId(firstName, lastName, phoneNumber) {
    
    let ruralFinId = baseUpiId;
    let counter = 1;
    const baseUpiId = `${firstName}${lastName}${counter}}@RURALFIN`.toUpperCase();
  let isUnique = false;

  while (!isUnique) {
    const existingUser = await User.findOne({ ruralFinId });

    if (!existingUser) {
      isUnique = true;
    } else {
      counter++;
      ruralFinId = `${baseUpiId}${counter}`;
    }
  }

  return ruralFinId;
}

async function allocateRuralFinId(userId) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const { firstName, lastName, phoneNumber } = user;

  const ruralFinId = await generateUniqueUpiId(firstName, lastName, phoneNumber);

  // Atomically update the user document with the generated UPI ID
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, ruralFinId: { $exists: false } }, // Ensure UPI ID is not already assigned
    { $set: { ruralFinId } },
    { new: true, upsert: false }
  );

  if (!updatedUser) {
    throw new Error("UPI ID assignment failed due to simultaneous registration.");
  }

  return updatedUser.ruralFinId;
}

module.exports = { allocateRuralFinId };
