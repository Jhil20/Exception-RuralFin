import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Prisma from "../utils/prisma.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt"

const pTop=asyncHandler(async(req,res)=>{
    const {sender_id, recipient_id, amount,user_pin }=req.body;

    console.log(sender_id, recipient_id, amount,user_pin);

    if(!sender_id || !recipient_id || !amount || amount<=0 || !user_pin)
    {
        throw new ApiError(400,"Invalid transaction details")
    }

    try{
      console.log("inside try")
        const senderWallet= await Prisma.userWallet.findUnique({
            where:{
                wallet_id: sender_id
            },
            select: { user_balance: true, user_pin: true },
        })

        console.log("sender wallet",senderWallet)

        if (!senderWallet) {
            throw new ApiError(400,"Sender wallet not found");
          }
          if(senderWallet.user_balance < amount)
          {
            throw new ApiError(400,"you dont have enough balance to make payment");
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
  const user_id = req.params.id;
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


const getWalletIdByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    throw new ApiError(400, "User ID is required");
  }
  console.log("inside wallet by user id")
  const wallet = await Prisma.userWallet.findUnique({
    where: { user_id:id },
    select: { wallet_id: true },
  });
  console.log("wallet",wallet)
  if (!wallet) {
    throw new ApiError(404, "Wallet not found for the given user ID");
  }

  res.status(200).json(
    new ApiResponse(200, { wallet_id: wallet.wallet_id }, "Wallet ID fetched successfully")
  );
});


const userAgentTransactionDeposit = asyncHandler(async (req,res)=>{
  const {userWalletId,agentWalletId,amount,agentPin} = req.body;
  if(!userWalletId)
  {
      throw new ApiError(400,"User Wallet Id is required");
  }
  if(!agentWalletId)
  {
      throw new ApiError(400,"Agent Wallet Id is required");
  }
  if(!amount)
  {
      throw new ApiError(400,"Enter Amount");
  }
  if(!agentPin)
  {
      throw new ApiError(400,"Agent Pin is required");
  }

  const user = await Prisma.userWallet.findUnique({
      where:{
          wallet_id:userWalletId
      }
  })
  if(!user)
  {
    throw new ApiError(400,"user does not exist")
  }

  const Agent = await Prisma.agentWallet.findUnique({
    where:{
      wallet_id:agentWalletId
    }
  })

  if(!Agent)
  {
    throw new ApiError(400,"Agent does not exist");
  }

  await Prisma.$transaction([
    Prisma.userWallet.update({
      where:{
        wallet_id:userWalletId
      },
      data:{
        user_balance:{
          increment:amount
        }
      }
    }),

    Prisma.agentWallet.update({
      where:{
        wallet_id:agentWalletId
      },
      data:{
        wallet_balance:{
          decrement:amount
        }
      }
    }),

    Prisma.userAgentTransaction.create({
      data:{
        user_id:user.user_id,
        agent_id:Agent.agent_id,
        amount:amount,
        transaction_type:"DEPOSIT",
      }
    })
  ])

  res.status(200).json(
    new ApiResponse(
      200,
      "Transaction Successfully Done"
    )
  )

})
export {pTop,getAllTransactionUser,getWalletIdByUserId,userAgentTransactionDeposit}