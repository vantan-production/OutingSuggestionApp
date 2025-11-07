<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Routing\Controller;

class PlacesController extends Controller
{
    /**
     * 座標周辺の店舗を検索
     */
    public function searchNearby(Request $request) {
        // 座標を取得
        $lat = $request->query('lat');
        $lon = $request->query('lon');
        $genre = $request->query('genre', 'restaurant');
        $onlyOpen = $request->query('only_open', false);

        // テスト用
        if (!$lat || !$lon) {
            $lat = 35.1815;
            $lon = 136.9066;
        }

        $apiKey = env('GOOGLE_PLACES_API_KEY');

        // Places API (New)のエンドポイント
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-Goog-Api-Key' => $apiKey,
            'X-Goog-FieldMask' => 'places.id,places.displayName,places.formattedAddress,places.types,places.rating,places.currentOpeningHours'
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
            $places = array_map(function($place) {
                return [
                    'id' => $place['id'] ?? null,
                    'name' => $place['displayName']['text'] ?? 'N/A',
                    'address' => $place['formattedAddress'] ?? 'N/A',
                    'rating' => $place['rating'] ?? null,
                    'genre' => $place['types'] ?? [],
                    'open_today' => $place['currentOpeningHours']['openNow'] ?? null  // 統一
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


    /**
     * 店舗の詳細情報を取得
     */
    public function getPlaceDetails(Request $request) {
        // 該当店舗のidを取得
        $placeId = $request->query('place_id');

        // バリデーション
        if (!$placeId) {
            return response()->json(['error' => '店舗idが存在しません'], 400);
        }

        // Places API - Place Details 呼び出し
        $placesApiKey = env('GOOGLE_PLACES_API_KEY');

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-Goog-Api-Key' => $placesApiKey,
            'X-Goog-FieldMask' => 'id,displayName,formattedAddress,types,rating,currentOpeningHours,regularOpeningHours,internationalPhoneNumber,photos'
        ])->get("https://places.googleapis.com/v1/{$placeId}");

        // エラー処理
        if (!$response->successful()) {
            return response()->json([
                'error' => '店舗詳細の取得に失敗',
                'status' => $response->status(),
            ], 500);
        }

        // 店舗詳細データ取得
        $place = $response->json();

        // 簡潔な形式に整形して返す
        return response()->json([
            'id' => $place['id'] ?? null,
            'name' => $place['displayName']['text'] ?? 'N/A',
            'address' => $place['formattedAddress'] ?? 'N/A',
            'rating' => $place['rating'] ?? null,   // 評価
            'genre' => $place['types'] ?? [],
            'open_today' => $place['currentOpeningHours']['openNow'] ?? null,    // 営業中か
            'opening_hours' => $place['regularOpeningHours']['weekdayDescriptions'] ?? [],  // 営業時間
            'phone' => $place['internationalPhoneNumber'] ?? null,  // 国際電話番号形式
            'images' => array_map(function($photo) {    // 店舗の写真（複数対応）
                return $photo['name'] ?? null;
            }, $place['photos'] ?? [])
        ]);
    }
}
