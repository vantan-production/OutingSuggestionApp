'use client'
import { useRouter } from "next/navigation";

function ProfilePage() {
    const router = useRouter();

    const Logout = () => {
        localStorage.removeItem('AuthLoginRequest');
    }
    return (
        <div className="bg-beige w-full h-screen">
            <section className="flex items-center justify-center w-full h-50">
                {/* 仮のheader */}
                <img src="/images/takamiuta.png" alt="app-logo" className="w-53 h-32 object-fill" />
            </section>
            <section className="flex items-center justify-between w-73 h-13">
                {/* 戻るボタン */}
                <button onClick={() => router.back()} className="w-11 y-11 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <path d="M11.1667 21.0833L1.25 11.1667M1.25 11.1667L11.1667 1.25M1.25 11.1667H21.0833" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div className="bg-blue w-49 h-13 rounded-lg flex items-center justify-center">
                    <h1 className="h1 text-white">ユーザー情報</h1>
                </div>
            </section>
            <section className="">
                <h2 className="h2-bold text-black px-2 pt-2">メールアドレス</h2>
                <div className="p-2">
                    <div className="w-93 h-13 border0-33 px-4 flex flex-start items-center">
                        <h3 className="h3 text-blue/80">test@example.com</h3>
                    </div>
                    <div className="w-full flex justify-end mt-2">
                        <button className="w-20 h-10 rounded-1 bg-blue text-white p">変更する</button>
                    </div>
                </div>
            </section>
            <section className="">
                <h2 className="h2-bold text-black px-2 pt-2">パスワード</h2>
                <div className="p-2">
                    <div className="w-93 h-13 border0-33 px-4 flex flex-start items-center">
                        <h3 className="h3 text-blue/80">********</h3>
                    </div>
                    <div className="w-full flex justify-end mt-2">
                        <button className="w-20 h-10 rounded-1 bg-blue text-white p">変更する</button>
                    </div>
                </div>
            </section>
            <section className="my-4">
                <h2 className="h2-bold text-black px-2 pt-2">電話番号</h2>
                <div className="p-2">
                    <div className="w-93 h-13 border0-33 px-4 flex flex-start items-center">
                        <h3 className="h3 text-blue/80">090-1234-5678</h3>
                    </div>
                    <div className="w-full flex justify-end mt-2">
                        <button className="w-20 h-10 rounded-1 bg-blue text-white p">変更する</button>
                    </div>
                </div>
            </section>
            <section className="my-4 w-full flex justify-center">
                <button onClick={Logout} className="w-93 h-13  bg-blue rounded-3 px-4 flex justify-center items-center">
                    <h3 className="h3 text-white">ログアウトする。</h3>
                </button>
            </section>
        </div>
    )
}

export default ProfilePage;