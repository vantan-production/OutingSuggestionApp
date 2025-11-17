"use client";

import { useState, useEffect } from "react";
import {
  PlaceResponse,
  calculateDistance,
  DEFAULT_LAT,
  DEFAULT_LON,
} from "../../api/place";
import GuestHeader from "../../../components/guestHeader";
import { useRouter } from "next/navigation";

import Header from "../../../components/guestHeader";
import StoreInfo from "../../../components/store-info";
import TopPage from "../top/page";
export default function TestPage() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<PlaceResponse["places"]>(
    []
  );
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lon: number;
  }>({ lat: DEFAULT_LAT, lon: DEFAULT_LON });

  useEffect(() => {
    // 現在地を取得
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("位置情報の取得に失敗:", error);
          setCurrentLocation({
            lat: DEFAULT_LAT,
            lon: DEFAULT_LON,
          });
        }
      );
    }
  }, []);

  // localStorageから検索結果を読み込む関数
  const loadSearchResults = () => {
    if (typeof window === "undefined") return; // SSR対策

    const storedResults = localStorage.getItem("searchResults");
    console.log(
      "localStorageから読み込み:",
      storedResults ? "データあり" : "データなし"
    );
    if (storedResults) {
      try {
        const results = JSON.parse(storedResults);
        console.log("検索結果を読み込みました:", results.length, "件");
        console.log("検索結果の内容:", results);

        // 配列かどうか確認
        if (Array.isArray(results)) {
          setSearchResults(results);
        } else {
          console.error("検索結果が配列ではありません:", results);
          setSearchResults([]);
        }
      } catch (error) {
        console.error("検索結果の読み込みエラー:", error);
        setSearchResults([]);
      }
    } else {
      console.log("localStorageに検索結果がありません");
    }
  };

  useEffect(() => {
    // 初回読み込み
    console.log("TestPageがマウントされました");
    loadSearchResults();

    // ページがフォーカスされた時にも読み込む
    const handleFocus = () => {
      console.log("ページがフォーカスされました");
      loadSearchResults();
    };

    window.addEventListener("focus", handleFocus);

    // カスタムイベントをリッスン（同じページ内での更新）
    const handleSearchResultsUpdated = (e: CustomEvent) => {
      console.log("検索結果が更新されました（カスタムイベント）:", e.detail);
      if (Array.isArray(e.detail)) {
        setSearchResults(e.detail);
      }
    };

    window.addEventListener(
      "searchResultsUpdated",
      handleSearchResultsUpdated as EventListener
    );

    // storageイベントもリッスン（他のタブからの更新）
    const handleStorageChange = (e: StorageEvent) => {
      console.log("storageイベントが発火:", e.key, e.newValue);
      if (e.key === "searchResults" && e.newValue) {
        try {
          const results = JSON.parse(e.newValue);
          if (Array.isArray(results)) {
            setSearchResults(results);
          }
        } catch (error) {
          console.error("検索結果の読み込みエラー:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // 定期的にlocalStorageをチェック（念のため）
    const interval = setInterval(() => {
      loadSearchResults();
    }, 1000);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener(
        "searchResultsUpdated",
        handleSearchResultsUpdated as EventListener
      );
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // 距離を計算する関数（store-info.tsxと同じ）
  const getDistance = (
    store: PlaceResponse["places"][number] | undefined
  ): string => {
    if (!currentLocation || !store || !store.lat || !store.lon) {
      return "-";
    }
    const distance = calculateDistance(
      currentLocation.lat,
      currentLocation.lon,
      store.lat,
      store.lon
    );
    return `${distance}`;
  };

  // 営業状況を取得する関数（store-info.tsxと同じ）
  const getBusiness = (
    store: PlaceResponse["places"][number] | undefined
  ): string => {
    if (!store) {
      return "-";
    }
    if (store.open_today === true) {
      return "営業中";
    } else if (store.open_today === false) {
      return "営業時間外";
    } else {
      return "定休日";
    }
  };

  return (
    <div className="bg-beige w-full min-h-screen">
      <GuestHeader />
      <section className="px-4 py-4">
        <h2 className="h2-bold text-black mb-4">
          検索結果 {searchResults.length > 0 && `(${searchResults.length}件)`}
        </h2>

        {searchResults.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-black p">検索結果がありません</p>
            <p className="text-sm text-gray-600 mt-2">
              AI検索ページで距離を選択してください
            </p>
            <button
              onClick={() => router.push("/ai-search")}
              className="mt-4 bg-blue text-white px-4 py-2 rounded-lg"
            >
              AI検索に戻る
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 justify-items-center">
            {searchResults.map((store) => (
              <div key={store.id} className="w-44 rounded-lg overflow-hidden">
                <div>
                  {store.photos &&
                  store.photos.length > 0 &&
                  store.photos[0]?.url ? (
                    <img
                      className="w-44 h-24"
                      src={store.photos[0].url}
                      alt="store-photo"
                    />
                  ) : null}
                </div>
                <div className="bg-orange w-44 p-1 h-30">
                  <ul>
                    <li className="p mx-1">{store.name}</li>
                    <div className="flex items-center gap-1">
                      <li className="h4 text-beige mx-1">
                        {getBusiness(store)}
                      </li>
                      <p className="p">{getDistance(store)}km</p>
                    </div>
                  </ul>
                  <div className="w-40 flex mx-1 mb-1">
                    <div className="flex ml-5">
                      <svg
                        className="mt-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                      >
                        <path
                          d="M5.2634 0.647447C5.28531 0.603177 5.31916 0.565913 5.36113 0.539859C5.40309 0.513806 5.4515 0.5 5.5009 0.5C5.5503 0.5 5.59871 0.513806 5.64067 0.539859C5.68264 0.565913 5.71649 0.603177 5.7384 0.647447L6.8934 2.98695C6.96949 3.14093 7.08181 3.27415 7.22071 3.37517C7.35962 3.4762 7.52096 3.542 7.6909 3.56695L10.2739 3.94495C10.3228 3.95204 10.3688 3.97268 10.4066 4.00455C10.4445 4.03641 10.4726 4.07822 10.4879 4.12525C10.5032 4.17228 10.505 4.22265 10.4932 4.27067C10.4814 4.31868 10.4563 4.36242 10.4209 4.39695L8.5529 6.21595C8.42971 6.336 8.33754 6.48419 8.28432 6.64776C8.2311 6.81134 8.21843 6.98539 8.2474 7.15495L8.6884 9.72495C8.69704 9.77387 8.69176 9.82423 8.67315 9.87029C8.65454 9.91635 8.62336 9.95625 8.58317 9.98545C8.54298 10.0146 8.49539 10.0319 8.44583 10.0354C8.39628 10.0388 8.34675 10.0283 8.3029 10.0049L5.9939 8.79095C5.84176 8.71106 5.67249 8.66932 5.50065 8.66932C5.32881 8.66932 5.15954 8.71106 5.0074 8.79095L2.6989 10.0049C2.65507 10.0282 2.6056 10.0386 2.55613 10.0351C2.50665 10.0316 2.45916 10.0142 2.41905 9.98506C2.37894 9.95588 2.34782 9.91604 2.32923 9.87006C2.31064 9.82408 2.30533 9.7738 2.3139 9.72495L2.7544 7.15545C2.7835 6.98581 2.77089 6.81165 2.71767 6.64797C2.66445 6.4843 2.5722 6.33602 2.4489 6.21595L0.5809 4.39745C0.545197 4.36296 0.519896 4.31915 0.507881 4.27098C0.495866 4.22282 0.497618 4.17226 0.512939 4.12504C0.52826 4.07783 0.556533 4.03587 0.594538 4.00394C0.632543 3.97201 0.678752 3.9514 0.7279 3.94445L3.3104 3.56695C3.48053 3.5422 3.64209 3.47648 3.78119 3.37544C3.92029 3.27441 4.03275 3.14108 4.1089 2.98695L5.2634 0.647447Z"
                          fill="#505050"
                          stroke="#505050"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="small ml-1 h-2 w-full">
                        {store.reviews && store.reviews.length > 0
                          ? store.reviews[0]?.text?.text || "-"
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
