//店舗名、営業時間、距離はAPIからデータを取得して表示
//レビューは一旦星5つで固定表示

import { PlaceResponse } from "../src/api/place";
import Image from "next/image";

type StoreListProps = {
  store: PlaceResponse["places"][number];
};

function StoreList({ store }: StoreListProps) {
  // 評価を星の数に変換
  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <ul className="flex pt-1.5">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return (
              <li key={index}>
                <img src="/images/black-star.png" alt="review-star" />
              </li>
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <li key={index}>
                <img src="/images/half-star.png" alt="review-star" />
              </li>
            );
          } else {
            return (
              <li key={index}>
                <img src="/images/white-star.png" alt="review-star" />
              </li>
            );
          }
        })}
      </ul>
    );
  };

  return (
    <div className="p-5">
      <div className="bg-orange flex w-93 h-35 rounded-lg items-center between p-2 text-black">
        <div>
          {store.photos && store.photos.length > 0 ? (
            <Image
              src={store.photos[0].url}
              alt={store.name}
              width={100}
              height={100}
              className="object-cover rounded"
            />
          ) : (
            <img src="/images/store-list-image.png" alt="store-image" />
          )}
        </div>
        <div>
          <div className="w-55 h-8 overflow-hidden">
            <h2 className="h2">{store.name}</h2>
          </div>
          <p className="text-white p-0.5">
            {store.open_today === true
              ? "営業時間中"
              : store.open_today === false
              ? "営業時間外"
              : "定休日"}
          </p>
          <div className="flex p-0.5">
            <p className="mr-5">住所</p>
            <p className="text-sm">{store.address}</p>
          </div>
          {store.rating && (
            <div className="flex p-0.5">
              <div className="mr-5">レビュー</div>
              {renderStars(store.rating)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoreList;
