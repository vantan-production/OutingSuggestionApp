import EventCategory from "../../../components/event-category";
import StoreInfo from "../../../components/store-info";

function TopPage() {
  return (
    <div className="bg-beige text-black mx-auto">
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

          <div className="text-center mb-15"><button className="text-white bg-black rounded-lg px-3 py-2">もっと見る</button></div>
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


          <div className="text-center mb-20"><button className="text-white bg-black rounded-lg px-3 py-2">もっと見る</button></div>
        </section>
      </main>
      <footer className="text-center">
        <button className="text-white bg-blue rounded-2xl px-40 py-3 mb-10 h3">AI検索</button>
      </footer>
    </div>
  );
}

export default TopPage;