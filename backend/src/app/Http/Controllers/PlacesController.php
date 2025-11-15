<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Routing\Controller;

class PlacesController extends Controller
{
    public function getDefaultLocation() {
        return response()->json([
            'lat' => env('DEFAULT_LAT', 35.1815),
            'lon' => env('DEFAULT_LON', 136.9066),
        ]);
    }
    /**
     * 座標周辺の店舗を検索
     */
    public function searchNearby(Request $request) {
        // 座標を取得
        $lat = $request->query('lat');
        $lon = $request->query('lon');
        $genre = $request->query('genre', 'restaurant');
        $onlyOpen = $request->query('only_open', false);
        $photos = $request->query('photos', false);
        $review = $request->query('review', false);

        // テスト用
        // こことfrontend/src/src/api/places.tsのDEFAULT_LATとDEFAULT_LONは一致しているので両方変更する
        if (!$lat || !$lon) {
            $lat = 35.1885;
            $lon = 136.9066;
        }

        $apiKey = env('GOOGLE_PLACES_API_KEY');

        // Places API (New)のエンドポイント
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-Goog-Api-Key' => $apiKey,
            'X-Goog-FieldMask' => 'places.id,places.displayName,places.formattedAddress,places.types,places.rating,places.currentOpeningHours,places.location,places.photos,places.reviews     '
        ])->post('https://places.googleapis.com/v1/places:searchNearby', [
            'locationRestriction' => [
                'circle' => [
                    'center' => [
                        'latitude' => (float)$lat,
                        'longitude' => (float)$lon
                    ],
                    'radius' => 1000.0
                ]
            ],
            'includedTypes' => [$genre],
            'maxResultCount' => 20, // 最大20件取得
            'languageCode' => 'ja'
        ]);

        if ($response->successful()) {
            $data = $response->json();

            // 簡潔な形式に整形
            $places = array_map(function($place) use ($apiKey) {
            // 店舗の緯度と経度を取得
            $placeLat = $place['location']['latitude'] ?? null;
            $placeLon = $place['location']['longitude'] ?? null;
            $placePhotos = [];
            if (isset($place['photos']) && is_array($place['photos']) && count($place['photos']) > 0) {
                foreach ($place['photos'] as $photo) {
                    if (isset($photo['name'])) {
                        // Google Places APIのMedia APIエンドポイントを使用
                        $photoName = $photo['name'];
                        $placePhotos[] = [
                            'url' => "https://places.googleapis.com/v1/{$photoName}/media?maxHeightPx=400&maxWidthPx=400&key={$apiKey}"
                        ];
                    }
                }
            }
            $placeReviews = [];
            if (isset($place['reviews']) && is_array($place['reviews'])) {
                $placeReview = $place['reviews'];
            }
                return [
                    'id' => $place['id'] ?? null,
                    'name' => $place['displayName']['text'] ?? 'N/A',
                    'address' => $place['formattedAddress'] ?? 'N/A',
                    'rating' => $place['rating'] ?? null,
                    'genre' => $place['types'] ?? [],
                    'open_today' => $place['currentOpeningHours']['openNow'] ?? null,  // 統一
                    'lat' => $placeLat,
                    'lon' => $placeLon,
                    'photos' => $placePhotos,
                    'review' => $placeReview
                ];
            }, $data['places'] ?? []);

            // 営業中の店舗のみフィルタ
            if ($onlyOpen) {
                $places = array_filter($places, function($place) {
                    return $place['open_today'] === true;
                });
                $places = array_values($places);
            }

            return response()->json(['places' => $places]);
        }

        return response()->json([
            'error' => '店舗情報の取得に失敗',
            'status' => $response->status(),
            'message' => $response->json()
        ], 500);
    }
}
