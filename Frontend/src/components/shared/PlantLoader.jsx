import React from "react";

const PlantLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-24 h-24">
        {/* Pot */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gray-300 rounded-b-lg"></div>

        {/* Plant */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          {/* Stem */}
          <div className="w-2 h-16 bg-green-500 mx-auto"></div>

          {/* Leaves */}
          <div className="absolute -left-4 top-4 w-8 h-8 bg-green-400 rounded-full transform -rotate-45 animate-bounce"></div>
          <div
            className="absolute -right-4 top-8 w-8 h-8 bg-green-400 rounded-full transform rotate-45 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="absolute -left-2 top-12 w-6 h-6 bg-green-400 rounded-full transform -rotate-12 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
          <div
            className="absolute -right-2 top-14 w-6 h-6 bg-green-400 rounded-full transform rotate-12 animate-bounce"
            style={{ animationDelay: "0.6s" }}
          ></div>
        </div>
      </div>

      <p className="mt-6 text-green-700 font-medium animate-pulse">
        Growing your content...
      </p>
    </div>
  );
};

export default PlantLoader;
