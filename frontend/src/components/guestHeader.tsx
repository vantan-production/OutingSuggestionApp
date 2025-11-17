"use client";
import Modal from "./modal";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  // モーダルが開いている時にbodyにクラスを追加
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    // クリーンアップ
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleButtonClick = () => {
    if (isModalOpen) {
      handleCloseModal();
    } else {
      handleOpenModal();
    }
  };

  const token = Cookies.get("auth_token");

  return (
    <div>
      <div className="bg-orange w-full h-16 flex justify-between px-2.5 items-center radius-2-5">
        {/* 仮でアプリのロゴを表示 */}
        <a href="/top" className="border border-black w-32 h-10">
          <img
            src="/image/uta.png"
            alt="app-logo"
            className="w-32 h-10 object-fill"
          />
        </a>
        <div className="flex gap-2.5 justify-center items-center">
          {!token ? (
            <>
              {/* プロフィールアイコン */}
              {isModalOpen && <Modal onClose={handleCloseModal} />}
              <button className="w-11 y-11" onClick={handleButtonClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  onClick={handleOpenModal}
                >
                  <path
                    d="M25.5 28.3333C25.5 26.079 24.6044 23.917 23.0104 22.3229C21.4163 20.7289 19.2543 19.8333 17 19.8333M17 19.8333C14.7456 19.8333 12.5836 20.7289 10.9896 22.3229C9.39551 23.917 8.49998 26.079 8.49998 28.3333M17 19.8333C20.1296 19.8333 22.6666 17.2963 22.6666 14.1667C22.6666 11.0371 20.1296 8.5 17 8.5C13.8704 8.5 11.3333 11.0371 11.3333 14.1667C11.3333 17.2963 13.8704 19.8333 17 19.8333ZM31.1666 17C31.1666 24.824 24.824 31.1667 17 31.1667C9.17595 31.1667 2.83331 24.824 2.83331 17C2.83331 9.17597 9.17595 2.83334 17 2.83334C24.824 2.83334 31.1666 9.17597 31.1666 17Z"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* お気に入りアイコン */}
              {isModalOpen && <Modal onClose={handleCloseModal} />}
              <button className="w-11 y-11" onClick={handleButtonClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <path
                    d="M2.83331 13.4583C2.83334 11.8819 3.31157 10.3425 4.20483 9.04353C5.0981 7.74456 6.36438 6.7471 7.83643 6.1829C9.30847 5.6187 10.917 5.5143 12.4497 5.88348C13.9823 6.25266 15.3669 7.07806 16.4206 8.25067C16.4948 8.33002 16.5845 8.39328 16.6842 8.43653C16.7838 8.47979 16.8913 8.5021 17 8.5021C17.1086 8.5021 17.2161 8.47979 17.3158 8.43653C17.4155 8.39328 17.5052 8.33002 17.5794 8.25067C18.6298 7.07044 20.0147 6.23811 21.5498 5.86444C23.0849 5.49077 24.6974 5.59349 26.1727 6.15894C27.648 6.72438 28.9161 7.72573 29.8082 9.0297C30.7003 10.3337 31.1742 11.8784 31.1666 13.4583C31.1666 16.7025 29.0416 19.125 26.9166 21.25L19.1363 28.7768C18.8723 29.0799 18.5469 29.3235 18.1815 29.4912C17.8162 29.6589 17.4194 29.747 17.0174 29.7495C16.6154 29.752 16.2175 29.669 15.8501 29.5059C15.4826 29.3429 15.1541 29.1035 14.8863 28.8037L7.08331 21.25C4.95831 19.125 2.83331 16.7167 2.83331 13.4583Z"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* 一時保存アイコン */}
              {isModalOpen && <Modal onClose={handleCloseModal} />}
              <button className="w-11 y-11" onClick={handleButtonClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <path
                    d="M17 8.5V17L22.1623 19.5812M22.6667 26.9167H31.1667M26.9167 22.6667V31.1667M31.0533 18.7949C31.4276 15.8634 30.8757 12.8882 29.475 10.286C28.0742 7.68376 25.8947 5.58473 23.2416 4.28282C20.5885 2.9809 17.5947 2.5413 14.6794 3.02556C11.764 3.50981 9.07309 4.89368 6.98338 6.98339C4.89367 9.07311 3.5098 11.764 3.02554 14.6794C2.54129 17.5947 2.98089 20.5886 4.2828 23.2416C5.58471 25.8947 7.68374 28.0742 10.286 29.475C12.8882 30.8757 15.8634 31.4276 18.7949 31.0533"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              {/* プロフィールアイコン 仮で/profileにリダイレクト*/}
              <button
                className="w-11 y-11"
                onClick={() => router.push("/profile")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <path
                    d="M25.5 28.3333C25.5 26.079 24.6044 23.917 23.0104 22.3229C21.4163 20.7289 19.2543 19.8333 17 19.8333M17 19.8333C14.7456 19.8333 12.5836 20.7289 10.9896 22.3229C9.39551 23.917 8.49998 26.079 8.49998 28.3333M17 19.8333C20.1296 19.8333 22.6666 17.2963 22.6666 14.1667C22.6666 11.0371 20.1296 8.5 17 8.5C13.8704 8.5 11.3333 11.0371 11.3333 14.1667C11.3333 17.2963 13.8704 19.8333 17 19.8333ZM31.1666 17C31.1666 24.824 24.824 31.1667 17 31.1667C9.17595 31.1667 2.83331 24.824 2.83331 17C2.83331 9.17597 9.17595 2.83334 17 2.83334C24.824 2.83334 31.1666 9.17597 31.1666 17Z"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* お気に入りアイコン 仮で/favoriteにリダイレクト*/}
              <button
                className="w-11 y-11"
                onClick={() => router.push("/favorite")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <path
                    d="M2.83331 13.4583C2.83334 11.8819 3.31157 10.3425 4.20483 9.04353C5.0981 7.74456 6.36438 6.7471 7.83643 6.1829C9.30847 5.6187 10.917 5.5143 12.4497 5.88348C13.9823 6.25266 15.3669 7.07806 16.4206 8.25067C16.4948 8.33002 16.5845 8.39328 16.6842 8.43653C16.7838 8.47979 16.8913 8.5021 17 8.5021C17.1086 8.5021 17.2161 8.47979 17.3158 8.43653C17.4155 8.39328 17.5052 8.33002 17.5794 8.25067C18.6298 7.07044 20.0147 6.23811 21.5498 5.86444C23.0849 5.49077 24.6974 5.59349 26.1727 6.15894C27.648 6.72438 28.9161 7.72573 29.8082 9.0297C30.7003 10.3337 31.1742 11.8784 31.1666 13.4583C31.1666 16.7025 29.0416 19.125 26.9166 21.25L19.1363 28.7768C18.8723 29.0799 18.5469 29.3235 18.1815 29.4912C17.8162 29.6589 17.4194 29.747 17.0174 29.7495C16.6154 29.752 16.2175 29.669 15.8501 29.5059C15.4826 29.3429 15.1541 29.1035 14.8863 28.8037L7.08331 21.25C4.95831 19.125 2.83331 16.7167 2.83331 13.4583Z"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* 一時保存アイコン 仮で/temporary-storageにリダイレクト*/}
              <button
                className="w-11 y-11"
                onClick={() => router.push("/temporary-storage")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <path
                    d="M17 8.5V17L22.1623 19.5812M22.6667 26.9167H31.1667M26.9167 22.6667V31.1667M31.0533 18.7949C31.4276 15.8634 30.8757 12.8882 29.475 10.286C28.0742 7.68376 25.8947 5.58473 23.2416 4.28282C20.5885 2.9809 17.5947 2.5413 14.6794 3.02556C11.764 3.50981 9.07309 4.89368 6.98338 6.98339C4.89367 9.07311 3.5098 11.764 3.02554 14.6794C2.54129 17.5947 2.98089 20.5886 4.2828 23.2416C5.58471 25.8947 7.68374 28.0742 10.286 29.475C12.8882 30.8757 15.8634 31.4276 18.7949 31.0533"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
