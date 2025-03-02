import React from "react";

const RecentTransactionCard = (props) => {
  const setShowRecentTransactionInfo = props.setShowRecentTransactionInfo;
  const setRecentTransactionInfo = props.setRecentTransactionInfo;

  // console.log("RecentTransactionCard", props.data);
  return (
    <div
      onClick={() => {
        console.log("transaction info clicked ndjjscjkbjcdbabajknjkfcsanjcasjncssckajk")
        setShowRecentTransactionInfo(true);
        setRecentTransactionInfo(props?.data);
      }}
      className="flex items-center hover:shadow-black/40 justify-between border border-gray-200 rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-500 cursor-pointer p-3"
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-400 mr-3"></div>
        <div>
          <div className="font-medium">Trans #{props.index + 1}</div>
          <div className="text-sm text-gray-500">
            {new Date(props?.data?.date_time).toLocaleTimeString()}
          </div>
        </div>
      </div>
      <div className="font-medium">₹{props?.data?.amount}</div>
    </div>
  );
};

export default RecentTransactionCard;
