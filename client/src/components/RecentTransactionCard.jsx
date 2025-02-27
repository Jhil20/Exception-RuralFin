import React from "react";

const RecentTransactionCard = (props) => {
    const setShowRecentTransactionInfo=props.setShowRecentTransactionInfo;
  return (
    <div onClick={()=>setShowRecentTransactionInfo(true)} className="flex items-center hover:shadow-black/40 justify-between border border-gray-200 rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-500 cursor-pointer p-3">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-400 mr-3"></div>
        <div>
          <div className="font-medium">Trans #1</div>
          <div className="text-sm text-gray-500">2h ago</div>
        </div>
      </div>
      <div className="font-medium">₹500</div>
    </div>
  );
};

export default RecentTransactionCard;
