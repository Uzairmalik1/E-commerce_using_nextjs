import React from "react";
import Title from "./Title";
import { Button } from "./ui/button";

const Featured = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Title title="Featured" heading="New Arrival" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:h-96 lg:gap-5">
        <div
          className="bg-black bg-no-repeat bg-contain bg-center rounded-md flex justify-end flex-col gap-2 text-white p-3 h-64 lg:h-full"
          style={{ backgroundImage: `url(/arrival_1.png)` }}
        >
          <h2 className="font-bold text-lg">Play Station 5</h2>
          <p className="text-xs w-48">
            Black and White version of the PS5 coming out on sale.
          </p>
          <Button className="w-20 bg-transparent">Shop Now</Button>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-rows-2 lg:gap-5">
          <div
            className="bg-black bg-no-repeat bg-contain bg-center rounded-md flex justify-end flex-col gap-2 text-white p-3 h-64 lg:h-full"
            style={{ backgroundImage: `url(/arrival_3.png)` }}
          >
            <h2 className="font-bold text-lg">Speakers</h2>
            <p className="text-xs w-48">
              Featured woman collections that give you another vibe.
            </p>
            <Button className="w-20 bg-transparent">Shop Now</Button>
          </div>
          <div
            className="bg-black bg-no-repeat bg-contain bg-center rounded-md flex justify-end flex-col gap-2 text-white p-3 h-64 lg:h-full"
            style={{ backgroundImage: `url(/arrival_4.png)` }}
          >
            <h2 className="font-bold text-lg">Perfume</h2>
            <p className="text-xs w-48">GUCCI INTENSE OUD EDP</p>
            <Button className="w-20 bg-transparent">Shop Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
