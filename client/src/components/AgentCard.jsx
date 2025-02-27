import React from "react";

const AgentCard = (props) => {
  const handleClick = props.onClick;
  return (
    <div
      onClick={() => handleClick(true)}
      className="flex items-center hover:shadow-black/40 justify-between border border-gray-200 hover:bg-gray-200 cursor-pointer tranisition-all duration-500 shadow-lg rounded-lg p-3"
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
          <div className="font-medium">Rahul K</div>
          <div className="flex items-center">
            <svg
              className="h-4 w-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm ml-1">4.8</span>
          </div>
          <div className="text-sm text-gray-500">North Delhi</div>
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
