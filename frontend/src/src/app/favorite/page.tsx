"use client";
import { useRouter } from "next/navigation";
import FavoriteList from "../../../components/favorite-list";
import Header from "../../../components/guestHeader";

function FavoritePage() {
    const router = useRouter()

    return(
        <div className="h-screen">
            <Header></Header>

            <main className="bg-beige">
                <div className="flex w-77 h-20 items-center justify-between mx-4">
                    <button onClick={()  => router.push("/top")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                            <path d="M11.1667 21.0833L1.25 11.1667M1.25 11.1667L11.1667 1.25M1.25 11.1667H21.0833" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <h1 className="h1 w-62 h-14 bg-blue text-white rounded-lg flex items-center justify-center">お気に入りリスト</h1>
                </div>
                <section className="flex flex-col items-center">
                    {/* 後で変数出力に切り替え */}
                    {[...Array(5)].map((_ , index) => (
                        <FavoriteList key={index}/>
                    ))}
                </section>
            </main>
            
        </div>
    );
}

export default FavoritePage;