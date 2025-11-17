"use client";

import { useState } from "react";

export default function NumberPeople() {
  const [people, setPeople] = useState(1);
  const [open, setOpen] = useState(false);

  const handleSelectPeople = (num: number) => {
    setPeople(num);
    setOpen(false);
  };

  const getDisplayText = () => {
    if (people >= 10) {
      return "10人以上";
    }
    return `${people}人`;
  };

  return (
    <div className="relative bg-orange mx-2 flex flex-col rounded-3 h-20 justify-center items-between">
      <div className="px-4 py-4 flex">
        <h4 className="h4 text-white w-full">合計人数</h4>
        <button
          onClick={() => setOpen(!open)}
          className="text-white p w-25 h-8 bg-blue rounded-4"
        >
          {getDisplayText()}
        </button>
      </div>
      {open && (
        <div className="absolute top-0 right-4 px-4 py-4 bg-blue rounded-2 z-10 w-fit text-white">
          <div className="flex flex-col gap-2">
            <div>
              <button
                className="text-white w-full h-full text-left"
                onClick={() => handleSelectPeople(1)}
              >
                1人
              </button>
            </div>
            <div>
              <button
                className="text-white w-full h-full text-left"
                onClick={() => handleSelectPeople(2)}
              >
                2人
              </button>
            </div>
            <div>
              <button
                className="text-white w-full h-full text-left"
                onClick={() => handleSelectPeople(3)}
              >
                3人
              </button>
            </div>
            <div>
              <button
                className="text-white w-full h-full text-left"
                onClick={() => handleSelectPeople(4)}
              >
                4人
              </button>
            </div>
            <div>
              <button
                className="text-white w-full h-full text-left"
                onClick={() => handleSelectPeople(5)}
              >
                5人
              </button>
            </div>
            <div>
              <button
                className="text-white w-full h-full text-left"
                onClick={() => handleSelectPeople(6)}
              >
                6人
              </button>
            </div>
            <div>
              <button
                className="text-white w-full h-full text-left"
                onClick={() => handleSelectPeople(7)}
              >
                7人
              </button>
            </div>
            <div>
              <button
                className="text-white w-full h-full text-left"
                onClick={() => handleSelectPeople(8)}
              >
                8人
              </button>
            </div>
            <div>
              <button
                className="text-white w-full h-full text-left"
                onClick={() => handleSelectPeople(9)}
              >
                9人
              </button>
            </div>
            <div>
              <button
                className="text-white w-full h-full text-left"
                onClick={() => handleSelectPeople(10)}
              >
                10人以上
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
