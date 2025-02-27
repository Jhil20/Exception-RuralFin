import React, { useState } from "react";
import { Star } from "lucide-react";

const UserCard = (props) => {
  const [userData] = useState(props.user);
  const [isStarred, setIsStarred] = useState(false);
  return (
    <div className="w-full rounded-xl p-4 flex justify-between items-center border shadow-lg border-black/20 hover:bg-gray-200 hover:shadow-black/40 transition duration-700 bg-gray-100">
      <div className="w-7/12">
        <h2 className="cursor-pointer text-lg font-bold text-gray-800">
          {userData.full_name}
        </h2>
        <p className="cursor-pointer text-sm text-gray-600">Phone: {userData.phone_number}</p>
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
        <button onClick={()=>console.log("clickkc")} className="bg-blue-900 cursor-pointer transition duration-500 text-white rounded-lg shadow-lg h-full w-full">Send</button>
      </div>
    </div>
  );
};

export default UserCard;
