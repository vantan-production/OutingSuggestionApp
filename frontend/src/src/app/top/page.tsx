"use client";
import { useRouter } from "next/navigation";
import EventCategory from "../../../components/event-category";
import StoreInfo from "../../../components/store-info";
import GuestHeader from "../../../components/guestHeader";

function TopPage() {
  const router = useRouter();
  return (
    <div className="bg-beige text-black mx-auto">
      <GuestHeader />
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

          <div className="text-center mb-15"><button className="text-white bg-black rounded-lg px-3 py-2">もっと見る</button></div>
        </section>
        <section>
          <div>
            <h2 className="h2 ml-4">【 近くのおすすめ店舗 】</h2>
            <div className="my-5 px-5 grid grid-cols-2 gap-4 w-full justify-items-center items-center">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="w-43 h-full">
                  <StoreInfo />
                </div>
              ))}
            </div>
          </div>


          <div className="text-center mb-20">
            <button className="text-white bg-black rounded-lg px-3 py-2"
            onClick={() => router.push("/NearbyStore")}
            >
              もっと見る
              </button>
          </div>
        </section>
      </main>
      <footer className="text-center">
        <button className="text-white bg-blue rounded-5 h2-bold w-93 h-17">AI検索</button>
      </footer>
    </div>
  );
}

export default TopPage;