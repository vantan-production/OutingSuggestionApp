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
}
