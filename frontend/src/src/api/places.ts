// 周辺店舗情報
export  type SurroundingStores = {
    // 緯度
    lat: number;
    // 経度
    lon: number;
    // ジャンル
    genres: string;
    // 開店中
    only_open: boolean;
}
export type Place = {
    // id
    id: string;
    // 店舗名
    name: string;
    // 住所
    address: string;
    // 評価
    rating: number | null;
    // ジャンル
    genres: string[];
    // 開店中
    open_today: boolean;
    // 距離
    lat: number;
    lon: number;
    // 写真
    photos: {url: string}[];
}
export type ResponseInfo = {
    // error
    error: string;
    // status
    status: number;
    // message
    message: string;
}
// ここの座標とbackend/src/app/Http/Controllers/PlacesController.phpの座標は一致している
export const DEFAULT_LAT = 35.1885;
export const DEFAULT_LON = 136.9066;

export  function storeInfo (req: SurroundingStores): Promise<Place[]> {
    // paramsに空の配列
    const empty = new URLSearchParams({
        // URLで渡すパラメータ
        lat: req.lat.toString(),
        lon: req.lon.toString(),
        genre: req.genres,
        only_open: req.only_open.toString(),
    });
    // Promis<Response>を返すために${empty}を使用    
    return fetch(`http://localhost:8007/api/places/nearby?${empty}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
          },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.places) {
            return data.places.map((place: Place) => {
                return {
                    id: place.id,
                    name: place.name,
                    address: place.address,
                    rating: place.rating,
                    genres: place.genres || [],
                    open_today: place.open_today,
                    lat: place.lat,
                    lon: place.lon,
                    photos: place.photos || [],
                }
            })
        } else {
            throw new Error(data.message);
        };
    })
    .catch((err) => {
        throw new Error("店舗情報の取得に失敗しました。");
    });
}
// 距離を計算する関数
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // 地球の半径（km）
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10; // 小数点第1位まで
}