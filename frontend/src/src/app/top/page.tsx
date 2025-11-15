"use client";

import { useState, useEffect, useRef } from "react";
import EventCategory from "../../../components/event-category";
import StoreInfo from "../../../components/store-info";

function TopPage() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  // 画面外タップで閉じる処理
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // footer の AI検索 が画面内に存在する → 右下ボタンを隠す
  const hideFloatingButton = false; // 必ず footer があるページなので true でOK

  // AI検索ページへ遷移（仮）
  const goToSearchPage = () => {
    window.location.href = "/ai-search"; // 必要に合わせて変更
  };

  return (
    <div className="bg-beige text-black mx-auto relative min-h-screen">
      <header>
        <div>header</div>
      </header>

      <main>
        <section>
          <h2 className="h2 ml-4 mt-15">【 近くで開催中のイベント 】</h2>
          <div className="my-5 ml-5 flex overflow-scroll">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="mx-2">
                <EventCategory />
              </div>
            ))}
          </div>

          <div className="text-center mb-15">
            <button className="text-white bg-black rounded-lg px-3 py-2">
              もっと見る
            </button>
          </div>
        </section>

        <section>
          <div>
            <h2 className="h2 ml-4">【 近くのおすすめ店舗 】</h2>
            <div className="my-5 px-5 flex flex-wrap">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="wh-42 p-2">
                  <StoreInfo />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-20">
            <button className="text-white bg-black rounded-lg px-3 py-2">
              もっと見る
            </button>
          </div>
        </section>
      </main>

      <footer className="text-center">
        <button className="text-white bg-blue rounded-2xl px-40 py-3 mb-10 h3">
          AI検索
        </button>
      </footer>

      {/* 右下のコンパクト AI検索ボタン（スマホのみ） */}
      {!hideFloatingButton && (
        <div
          ref={buttonRef}
          className={`fixed bottom-6 right-6 transition-all duration-300 shadow-lg ${
            isOpen
              ? "w-40 h-16 bg-blue text-white rounded-2xl"
              : "w-16 h-16 bg-blue text-white rounded-full"
          } flex items-center justify-center text-sm`}
          onClick={() => {
            if (isOpen) {
              goToSearchPage(); // 2回目タップで遷移
            } else {
              setIsOpen(true); // 初回タップで展開
            }
          }}
        >
          {isOpen ? "AI検索を使う" : "AI検索"}
        </div>
      )}
    </div>
  );
}

export default TopPage;
