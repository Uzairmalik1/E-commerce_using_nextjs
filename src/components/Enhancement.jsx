import { staticTime } from "@/utils/data";
import React from "react";
import { Button } from "./ui/button";

const Enhancement = () => {
  return (
    <div className="mt-10 bg-black grid grid-cols-1 gap-5 p-5 lg:grid-cols-2 lg:gap-0 lg:p-10">
      <div className="flex flex-col justify-center gap-5">
        <h2 className="text-green-500 font-bold text-md">Categories</h2>
        <h1 className="text-2xl text-white lg:text-4xl">Enhance Your Music Experience</h1>
        <div className="flex flex-wrap gap-5">
          {staticTime.map((item, index) => (
            <div
              key={index}
              className="flex justify-center items-center flex-col bg-white h-16 w-16 rounded-full text-xs"
            >
              <p>{item.count}</p>
              <p>{item.time}</p>
            </div>
          ))}
        </div>
        <Button className="bg-green-500 w-full lg:w-28">Buy Now</Button>
      </div>
      <div className="flex justify-center">
        <img src="/speaker.png" alt="Speaker" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default Enhancement;
