import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Prisma from "../utils/prisma.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const pTop=asyncHandler(async(req,res)=>{
    const {sender_id, recipient_id, amount,user_pin }=req.body;

    if(!sender_id || !recipient_id || !amount || amount<=0 || !user_pin)
    {
        throw new ApiError(400,"Invalid transaction details")
    }

    try{
        const senderWallet= await Prisma.UserWallet.findUnique({
            where:{
                wallet_id: sender_id
            },
            select: { user_balance: true, user_pin: true },
        })

        if (!senderWallet) {
            throw new ApiError(400,"Sender wallet not found");
          }
        
          const recipientWallet = await Prisma.userWallet.findUnique({
            where: { wallet_id: recipient_id },
            select: { user_balance: true }, // No need to fetch user_pin for recipient
          });
      
          if (!recipientWallet) {
            throw new ApiError(400,"Recipient wallet not found");
          }
          const sid=await Prisma.userWallet.findUnique({
            where:{
                wallet_id:sender_id,
            },
            select:{
                user_id: true
            }
          })

          const rid=await Prisma.userWallet.findUnique({
            where:{
                wallet_id:recipient_id
            },
            select:{
                user_id:true
            }
          })
          console.log(sid.user_id);
          console.log(rid.user_id);
          
          Prisma.$transaction([
            Prisma.userWallet.update({
                where: { wallet_id: sender_id },
                data: { user_balance: { decrement: amount } },
              }),

               Prisma.userWallet.update({
                where: { wallet_id: recipient_id },
                data: { user_balance: { increment: amount } },
              }),

              Prisma.peerToPeerTransaction.create({
                data:{
                    sender_id:sid.user_id,
                    recipient_id:rid.user_id,
                    amount
                }
              })
          ])

        res.status(200).json(
            new ApiResponse(200,"Transaction successful")
        );
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Transaction failed", error: error.message });
      }
})

const getAllTransactionUser = asyncHandler(async(req,res)=>{
  const user_id = req.body.user_id;
  console.log(user_id)
  if(!user_id)
  {
    throw new ApiError(400,"please provide the user ID");
  }
  const allUserTransaction = await Prisma.peerToPeerTransaction.findMany({
    where:{
      OR:[
        {sender_id:user_id},
        {recipient_id:user_id}
      ]
    }
  })
  if(!allUserTransaction)
  {
    throw new ApiError(400,"Transaction related to that user not found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      {
        Transaction:allUserTransaction
      },
      "All transaction fetched successfully"
    )
  )
})

export {pTop,getAllTransactionUser}
