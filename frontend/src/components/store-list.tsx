//店舗名、営業時間、距離はAPIからデータを取得して表示
//レビューは一旦星5つで固定表示

function StoreList() {
  return (
  <div className="pb-5">
    <div className="bg-orange flex w-93 h-32 rounded-lg items-center justify-between p-2 text-black">
      <div><img src="/images/store-list-image.png" alt="store-image" /></div>
      <div>
        <div className="w-55 h-8 overflow-hidden">
          <h2 className="h2 ">シフォンベントウカリーズ</h2>  
        </div>
        <p className="h4 text-white">営業時間中</p>
        <div className="h4 flex">
          <p className="mr-5">距離</p>
          <p>0.00km</p>  
        </div>
        <div className="flex">
          <div className="h4 mr-0.5">レビュー</div>
          <ul className="flex pt-2">
            <li><img src="/images/black-star.png" alt="review-star" /></li>
            <li><img src="/images/black-star.png" alt="review-star" /></li>
            <li><img src="/images/black-star.png" alt="review-star" /></li>
            <li><img src="/images/black-star.png" alt="review-star" /></li>
            <li><img src="/images/black-star.png" alt="review-star" /></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  );
}export default StoreList;