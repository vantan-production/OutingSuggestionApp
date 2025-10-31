//店舗名、営業時間、距離はAPIからデータを取得して表示
//レビューは一旦星5つで固定表示

function EventList() {
  return (
  <div className="p-5">
    <div className="bg-orange flex w-93 h-40 rounded-lg items-center justify-between p-2 text-black">
      <div><img src="/images/store-list-image.png" alt="store-image" /></div>
      <div>
        <div className="w-55 h-8 overflow-hidden">
          <h2 className="h2 ">シフォンベントウカリーズ</h2>  
        </div>
        <ul className="flex pt-1 small">
            <li className="bg-white m-1 mx-[5] rounded-lg p-0.5"><p>カテゴリ</p></li>
            <li className="bg-white m-1 mx-[5] rounded-lg p-0.5"><p>カテゴリ</p></li>
            <li className="bg-white m-1 mx-[5] rounded-lg p-0.5"><p>カテゴリ</p></li>
          </ul>
        <div className="flex p-0.5">
          <p className="mr-5">期間</p>
          <p>1999年 12月 23日まで</p>  
        </div>
        <div className="w-55 h-12 overflow-hidden">
          <p className="">
            イベント詳細イベント詳細イベント詳細イベント詳細イベント詳細イベント詳細イベント詳細イベント詳細イベント詳細
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}export default EventList;