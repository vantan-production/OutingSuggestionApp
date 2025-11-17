"use client";
// import GuestHeader from "../../../components/guestHeader";
import { useState, useEffect } from "react";

type Props = {
  params: {
    id: string;
  };
};

type Review = {
  rating: number | null;
  text: string;
  author: string;
  author_photo: string | null;
  date: string | null;
  relative_time: string;
};

type Store = {
  id: string;
  name: string;
  address: string;
  rating: number | null;      // 評価
  open_today: boolean | null; // 現在営業中か
  today_hours: string | null; // 今日の営業時間
  opening_hours: string[];    // 全曜日の営業時間
  phone: string | null;
  images: { url: string }[];
  reviews: Review[];
};

function StoreDetailPage({ params }: Props) {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // APIからデータ取得
    const fetchStoreDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8007/api/places/details?place_id=${params.id}`
        );

        if (!response.ok) {
          throw new Error('店舗情報の取得に失敗しました')
        }

        const data = await response.json();
        setStore(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetail();
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-5">
        <p className="text-gray-600">読み込み中...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-5">
        <h1 className="text-2xl font-bold text-red-60 mb-4">エラー</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }
  if (!store) {
    return (
      <div className="p-5">
        <h1 className="text-2xl font-bold text-gray-800">店舗が見つかりません</h1>
      </div>
    );
  }

  return (
    <div>
      {/* 戻るボタン */}
      <button>←戻る</button>

      {store.images.length > 0 && (
        <div>
          {/* 写真 */}
          <div>
            {store.images.slice(0, 1).map((photo, index) => (
              <img key={index} src={photo.url} alt={`${store.name}の写真${index + 1}`} />
            ))}
          </div>
          
          <div className="flex">
            {/* 評価 */}
            <div>☆{store.rating}</div>
            {/* 機能ボタン */}
            <ul className="flex">
              <li>お気に入り</li>
              <li>一時保存</li>
              <li>共有</li>
            </ul>
          </div>
        </div>
      )}

      {/* 店舗情報 */}
      <div>
        {/* 店舗名 */}
        <div className="flex">
          <h3>店舗名</h3>
          <p>{store.name}</p>
        </div>

        {/* 営業状態・営業時間 */}
        <div className="flex">
          {store.open_today === true && (
            <h3>営業時間中</h3>
          )}
          {store.open_today === false && (
            <h3>営業時間外</h3>
          )}
          <p>{store.today_hours}</p>
        </div>

        {/* 住所 */}
        <div className="flex">
          <h3>住所</h3>
          <p>{store.address}</p>
        </div>
        
        {/* 電話番号 */}
        <div className="flex">
          <h3>電話番号</h3>
          <p>{store.phone}</p>
        </div>
      </div>

      {/* レビュー */}
      <div>
        <h2>店舗レビュー</h2>
        <button>レビューを投稿</button>
        <ul>
          <li>
            <div>
              <div>
                <p>評価</p>
                <ul>
                  <li>星画像</li>
                </ul>
              </div>
              <div>ユーザーネーム</div>
            </div>
            <div>
              <h4>タイトル：　タイトルが入ります</h4>
            </div>
            <div>本文が入ります</div>
            <div>投稿日：yyyy/mm/dd</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StoreDetailPage;