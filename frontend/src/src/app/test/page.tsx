function StoreList() {
  return (
  <div className="p-5">
    <div className="bg-orange flex w-93 h-35 rounded-lg items-center justify-between p-2 text-black">
      <div><img src="/images/store-list-image.png" alt="store-image" /></div>
      <div>
        <div className="w-55 h-7.5 overflow-hidden">
          <h2 className="h2 ">シフォンベントウカリーズ</h2>
        </div>
        <p className="text-white p-0.5">営業時間中</p>
        <div className="flex p-0.5">
          <p className="mr-5">距離</p>
          <p>0.00km</p>
        </div>
        <div className="flex p-0.5">
          <div className="mr-5">レビュー</div>
          <ul className="flex pt-1.5">
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