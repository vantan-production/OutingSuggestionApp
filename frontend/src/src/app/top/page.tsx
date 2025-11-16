"use client";

import { useState, useEffect, useRef } from "react";
import EventCategory from "../../../components/event-category";
import StoreInfo from "../../../components/store-info";

function TopPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [hideFloatingButton, setHideFloatingButton] = useState(false);

  const buttonRef = useRef<HTMLDivElement | null>(null);
  const footerButtonRef = useRef<HTMLButtonElement | null>(null); // ← footer監視用

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

  // footer の AI検索 ボタンが画面に映っているか監視
  useEffect(() => {
    if (!footerButtonRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setHideFloatingButton(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(footerButtonRef.current);
    return () => observer.disconnect();
  }, []);

  // AI検索ページへ遷移（仮）
  const goToSearchPage = () => {
    window.location.href = "/ai-search";
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
        <button
          ref={footerButtonRef}
          className="text-white bg-blue rounded-2xl w-90 h-14 mb-10 h3"
        >
          AI検索
        </button>
      </footer>

      {/* 右下のコンパクト AI検索ボタン（スマホのみ / footerが見えたら消える） */}
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
              goToSearchPage();
            } else {
              setIsOpen(true);
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
