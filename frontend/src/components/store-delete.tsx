//店舗名、営業時間、距離はAPIからデータを取得して表示
//データの削除はバックエンド側で実装予定
//レビューは一旦星5つで固定表示

function StoreDelete() {
  return (
  <div className="p-5">
    <div className="bg-orange flex w-93 h-35 rounded-lg items-center justify-between p-2 text-black">
      <div><img src="/images/store-list-image.png" alt="store-image" /></div>
      <div>
        <div className="w-55 h-8 overflow-hidden">
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
          <div className="bg-[#D9D9D9] rounded-full w-7 h-7">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="21" viewBox="0 0 19 21" fill="none" className="m-1">
              <path d="M7.5155 9.4485V15.2475M11.3815 9.4485V15.2475M16.214 4.616V18.147C16.214 18.6597 16.0103 19.1513 15.6478 19.5138C15.2853 19.8763 14.7937 20.08 14.281 20.08H4.616C4.10334 20.08 3.61167 19.8763 3.24916 19.5138C2.88666 19.1513 2.683 18.6597 2.683 18.147V4.616M0.75 4.616H18.147M5.5825 4.616V2.683C5.5825 2.17034 5.78616 1.67867 6.14866 1.31616C6.51117 0.953655 7.00284 0.75 7.5155 0.75H11.3815C11.8942 0.75 12.3858 0.953655 12.7483 1.31616C13.1108 1.67867 13.3145 2.17034 13.3145 2.683V4.616" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}export default StoreDelete;