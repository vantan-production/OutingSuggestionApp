<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Routing\Controller;

class RecommendController extends Controller
{
    /**
     * おすすめ店舗を取得
     */
    public function getRecommendations(Request $request) {
        // 現在地取得（初期値名古屋）
        $lat = $request->query('lat', 35.1815);
        $lon = $request->query('lon', 136.9066);

        // OpenWeatherMap API 呼び出し
        $weatherApiKey = env('OPENWEATHER_API_KEY');
        $weatherApiUrl = env('OPENWEATHER_API_URL');

        $weatherResponse = Http::get("{$weatherApiUrl}/weather", [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $weatherApiKey,
            'units' => 'metric',
            'lang' => 'ja',
        ]);

        // エラー処理
        if (!$weatherResponse->successful()) {
            return response()->json(['error' => '天気取得失敗'], 500);
        }

        // 天気データ取得
        $weatherData = $weatherResponse->json();
        $weather = $weatherData['weather'][0]['main'];

        // ジャンルを天気で条件分岐
        $genre = $this->getGenreByWeather($weather);


        // Places API 呼び出し
        $placesApiKey = env('GOOGLE_PLACES_API_KEY');

        $placesResponse = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-Goog-Api-Key' => $placesApiKey,
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
            'maxResultCount' => 10, // 最大10件取得
            'languageCode' => 'ja'
        ]);

        // エラー処理
        if (!$placesResponse->successful()) {
            return response()->json(['error' => '店舗取得失敗'], 500);
        }

        // 店舗データ取得
        $placesData = $placesResponse->json();

        // 簡潔な形式に整形
        $places = array_map(function($place) {
            return [
                'id' => $place['id'] ?? null,
                'name' => $place['displayName']['text'] ?? 'N/A',
                'address' => $place['formattedAddress'] ?? 'N/A',
                'rating' => $place['rating'] ?? null,   // 評価
                'genre' => $place['types'] ?? [],
                'open_today' => $place['currentOpeningHours']['openNow'] ?? null    // 営業中か
            ];
        }, $placesData['places'] ?? []);

        // 営業中の店舗のみフィルタ
        $onlyOpen = $request->query('only_open', false);
        if ($onlyOpen) {
            $places = array_filter($places, function($place) {
                return $place['open_today'] === true;
            });
            $places = array_values($places);
        }

        // 結果を返す
        return response()->json([
            'weather' => $weather,
            'recommended_genre' => $genre,
            'places' => $places,
        ]);
    }


    /**
     * ジャンルの決定
     */
    private function getGenreByWeather($weather) {
        switch ($weather) {
            case 'Clear':
            case 'Snow':
                $genre = 'restaurant';
                break;
            case 'Rain':
            case 'Drizzle':         // 霧雨
            case 'Thunderstorm':    // 雷雨
                $genre = 'movie_theater';
                break;
            case 'Clouds':
                $genre = 'shopping_mall';
                break;
            default:
                $genre = 'cafe';
                break;
        }
        return $genre;
    }
}
