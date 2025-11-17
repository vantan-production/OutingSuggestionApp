"use client";

import GuestHeader from "../../../components/guestHeader";
import { useRouter } from "next/navigation";
import DistanceSlider from "../../../components/search/distance-slider";
import NumberPeople from "../../../components/search/number-people";
import BudgetSlider from "../../../components/search/budget-slider";
import { useState } from "react";
import { PlaceResponse } from "../../api/place";

function AiSearchPage() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<PlaceResponse["places"]>(
    []
  );

  const handleSearchComplete = (places: PlaceResponse["places"]) => {
    setSearchResults(places);
    // localStorageに検索結果を保存
    localStorage.setItem("searchResults", JSON.stringify(places));
    console.log("検索結果:", places);
  };

  const handleNext = () => {
    // 最新の検索結果を確認
    const storedResults = localStorage.getItem("searchResults");
    if (storedResults) {
      try {
        const results = JSON.parse(storedResults);
        console.log("遷移前の検索結果:", results.length, "件");
      } catch (error) {
        console.error("検索結果の読み込みエラー:", error);
      }
    }
    router.push("/test");
  };

  return (
    <div className="bg-beige w-full h-screen pb-4">
      <GuestHeader />
      <section className="flex text-start w-70 h-20 items-center justify-between mx-4">
        <button onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
          >
            <path
              d="M11.1667 21.0833L1.25 11.1667M1.25 11.1667L11.1667 1.25M1.25 11.1667H21.0833"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="h1 w-48 h-14 bg-blue text-white rounded-lg flex items-center justify-center">
          AI検索
        </h1>
      </section>
      <section className="pb-4">
        <h2 className="h2-bold text-black mt-5 ml-2">距離を入力してください</h2>
        <div className="w-full mx-auto">
          <div className="bg-orange mx-2 flex flex-col rounded-3 h-30">
            {/* ここは自分の現在地を表示 */}
            <div className="w-fit h-10 bg-blue flex items-center justify-center p-2 m-2 rounded-2">
              <p className="text-white p">愛知県名古屋市中村区1-1-1</p>
            </div>
            <DistanceSlider
              min={10}
              max={100}
              step={10}
              defaultValue={10}
              onSearchComplete={handleSearchComplete}
            />
          </div>
        </div>
      </section>
      <section className="pb-4">
        <h2 className="h2-bold text-black mt-5 ml-2">人数を入力してください</h2>
        <div className="w-full mx-auto">
          <NumberPeople />
        </div>
      </section>
      <section className="mb-4">
        <h2 className="h2-bold text-black mt-5 ml-2 pb-2">
          予算を入力してください
        </h2>
        <div className="bg-orange mx-2 flex flex-col rounded-3 h-22">
          <div className="w-full mx-auto">
            <BudgetSlider
              min={1000}
              max={10000}
              step={1000}
              defaultValue={1000}
            />
          </div>
        </div>
      </section>
      <section>
        <button
          className="w-full h-11 bg-blue text-white rounded-full flex items-center justify-center"
          onClick={handleNext}
        >
          <p className="text-white p">次へ</p>
        </button>
      </section>
    </div>
  );
}

export default AiSearchPage;
