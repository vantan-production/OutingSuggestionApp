"use client";

import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { searchByDistance } from "../../src/api/search/distance";
import { DEFAULT_LAT, DEFAULT_LON, PlaceResponse } from "../../src/api/place";

type DistanceSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onSearchComplete?: (places: PlaceResponse["places"]) => void;
};

export default function DistanceSlider({
  min = 10,
  max = 100,
  step = 10,
  defaultValue = 10,
  onChange,
  onSearchComplete,
}: DistanceSliderProps) {
  const [distance, setDistance] = useState(defaultValue);
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = (value: number | number[]) => {
    const numValue = Array.isArray(value) ? value[0] : value;
    setDistance(numValue);
    onChange?.(numValue);
  };

  // 距離が変更された時に店舗を検索
  useEffect(() => {
    const searchStores = async () => {
      setIsSearching(true);
      console.log("検索開始: 距離", distance, "km");
      try {
        const result = await searchByDistance({
          distance: distance,
          lat: DEFAULT_LAT,
          lon: DEFAULT_LON,
          genre: "restaurant",
          only_open: false,
          photos: true,
        });

        console.log("APIレスポンス:", result);
        console.log("検索結果の件数:", result.places?.length || 0);

        if (!result.places || result.places.length === 0) {
          console.warn("検索結果が空です");
          return;
        }

        // localStorageに検索結果を保存
        localStorage.setItem("searchResults", JSON.stringify(result.places));
        console.log("localStorageに保存しました:", result.places.length, "件");

        // カスタムイベントを発火（同じページ内で通知）
        window.dispatchEvent(
          new CustomEvent("searchResultsUpdated", {
            detail: result.places,
          })
        );

        // コールバックも呼び出す（既存の機能を維持）
        onSearchComplete?.(result.places);

        console.log("検索結果を保存しました:", result.places.length, "件");
      } catch (error) {
        console.error("店舗検索エラー:", error);
      } finally {
        setIsSearching(false);
      }
    };

    // デバウンス処理（500ms待機してから検索）
    const timer = setTimeout(() => {
      searchStores();
    }, 500);

    return () => clearTimeout(timer);
  }, [distance, onSearchComplete]);

  return (
    <>
      <div className="flex items-center justify-center mx-auto gap-3">
        <div className="text-center h-[18px] w-3">{min}</div>
        <Slider
          value={distance}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          style={{
            width: "253px",
            height: "16px",
          }}
        />
        <div className="text-center h-[18px]">{max}</div>
      </div>
      <div className="text-end mr-6 mt-3">{distance}km</div>
    </>
  );
}
