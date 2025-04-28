import React, { useEffect } from "react";
import { Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Loading = () => {
    const navigate=useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/home")
        },2000);
    },[])
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="flex items-center h-12 justify-center ">
          <div className="relative">
            <Wallet size={72} className="text-white mr-2 animate-bounce mb-6" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full filter blur-sm"></div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            <span className="inline-block animate-pulse">Flux</span>
            <span className="text-gray-400">Wallet</span>
          </h1>
        </div>

        <div className="space-y-3">
          <div className="h-1 w-60 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full w-full bg-white origin-left animate-[loading_1.5s_ease-in-out_infinite]"></div>
          </div>
          <p className="text-gray-400 text-sm animate-pulse">
            Loading your financial dashboard...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
