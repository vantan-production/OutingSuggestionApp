"use client";

import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type BudgetSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
};

export default function BudgetSlider({
  min = 1000,
  max = 10000,
  step = 1000,
  defaultValue = 1000,
  onChange,
}: BudgetSliderProps) {
  const [budget, setBudget] = useState(defaultValue);

  const handleChange = (value: number | number[]) => {
    const numValue = Array.isArray(value) ? value[0] : value;
    setBudget(numValue);
    onChange?.(numValue);
  };

  return (
    <>
      <div className="flex items-center justify-center w-full  h-9">
        <div className="text-center h-4 w-fit">{min}</div>
        <Slider
          value={budget}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          style={{
            width: "253px",
            height: "16px",
          }}
        />
        <div className="text-center h-4 w-fit">{max}</div>
      </div>
      <div className="text-end mr-6 mt-3">{budget}円</div>
    </>
  );
}
