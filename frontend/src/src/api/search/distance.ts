import { PlaceResponse, DEFAULT_LAT, DEFAULT_LON } from "../place";

export type DistanceSearchRequest = {
  // 緯度
  lat?: number;
  // 経度
  lon?: number;
  // 距離（km）
  distance: number;
  // ジャンル
  genre?: string;
  // 開店中のみ
  only_open?: boolean;
  // 写真を含める
  photos?: boolean;
};

/**
 * 距離に応じて店舗を検索する関数
 * @param req 検索リクエストパラメータ
 * @returns 店舗情報の配列
 */
export function searchByDistance(
  req: DistanceSearchRequest
): Promise<PlaceResponse> {
  const lat = req.lat ?? DEFAULT_LAT;
  const lon = req.lon ?? DEFAULT_LON;

  // 距離（km）をメートルに変換
  const radiusInMeters = req.distance * 1000;

  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    radius: radiusInMeters.toString(),
    genre: req.genre ?? "restaurant",
    only_open: (req.only_open ?? false).toString(),
    ...(req.photos !== undefined && { photos: req.photos.toString() }),
  });

  return fetch(`http://localhost:8007/api/places/nearby?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`店舗検索に失敗しました: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("店舗検索エラー:", error);
      throw error;
    });
}
