import React from "react";

const AgentCard = (props) => {
  const handleClick = props?.onClick;
  // console.log("props data in agent card", props?.data);
  return (
    <div
      onClick={() => {
        console.log("props data of agent",props.data)
        props.setShowAgentInfo(props.data);
        handleClick(true);
      }}
      className="flex items-center h-[84px] hover:shadow-black/40 justify-between border border-gray-200 hover:bg-gray-200 cursor-pointer tranisition-all duration-500 shadow-lg rounded-lg p-3"
    >
      <div className="flex items-center">
        <div className="mr-3">
          <svg
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div>
          <div className="font-medium">{props?.data?.full_name}</div>
          <div className="text-sm text-gray-500">{props?.data?.city}</div>
          <div className="text-sm text-gray-500">{props?.data?.phone_num}</div>
        </div>
      </div>
      <div>
        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
          Available
        </span>
      </div>
    </div>
  );
};

export default AgentCard;
