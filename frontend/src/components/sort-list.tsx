"use client";

import { useState } from "react";

export default function SortMenu() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("近い順");

  const options = ["近い順", "遠い順", "新しい順", "古い順", "評価が高い順"];

  return (
    <div className="relative h-11 w-36">
      <button
        onClick={() => setOpen(!open)}
        className="h4 flex items-center justify-center w-full bg-blue text-white px-2 py-2 rounded-md hover:opacity-90"
      >
        {selected}
      </button>

      {open && (
        <div className="h4 absolute right-0 w-36  bg-white shadow-md rounded-md overflow-hidden">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => {
                setSelected(option); // メインボタンに反映
                setOpen(false);       // リストを閉じる
              }}
              className="h4 block w-full text-left px-2 py-2 border-b border-[#767680]/50 last:border-none
                          bg-[#767680]/10 hover:bg-[#767680]/20 active:bg-blue active:text-white
                          transition-colors duration-150"
            >
              {option}
            </button>
          ))}
        </div>
      )}
      <div>
        <img src="" alt="" />
      </div>
    </div>
  );
}
