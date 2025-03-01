import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";

const UserCard = (props) => {
  const [userData] = useState(props.user);
  console.log("user data", props.user);
  const [walletId, setWalletId] = useState("");
  const [isStarred, setIsStarred] = useState(false);

  useEffect( () => {
    getWalletIdOfUser();
  }, []);

  const getWalletIdOfUser=async()=>{
    const result = await axios.get(
      `http://localhost:5000/transaction/getWalletByUser/${userData.user_id}`
    );
    console.log("user card no data", result);
    setWalletId(result?.data?.data?.wallet_id);
  }
  return (
    <div className="w-full rounded-xl p-4 flex justify-between items-center border shadow-lg border-black/20 hover:bg-gray-200 hover:shadow-black/40 transition duration-700 bg-gray-100">
      <div className="w-7/12">
        <h2 className=" text-lg font-bold text-gray-800">
          {userData.full_name}
        </h2>
        <p className=" text-sm text-gray-600">Wallet Id: {walletId}</p>
      </div>
      <div className="w-2/12 flex justify-center">
        <button
          onClick={() => setIsStarred(!isStarred)}
          className="p-2 cursor-pointer rounded-full transition duration-300"
        >
          <Star
            size={20}
            className={
              isStarred ? "fill-yellow-500 text-yellow-500" : "text-gray-500"
            }
          />
        </button>
      </div>
      <div className="w-3/12 cursor-pointer hover:shadow-black/40 h-10">
        <button
          onClick={() => {
            props.setShowPTP(true);
            props.setRecieverId(userData.user_id);
          }}
          className="bg-gradient-to-tr from-blue-600 to-blue-950 hover:from-blue-950 hover:to-blue-600  cursor-pointer transition duration-500 text-white rounded-lg shadow-lg h-full w-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserCard;
