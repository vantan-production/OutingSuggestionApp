<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Routing\Controller;

class WeatherController extends Controller {
    /**
     * 座標（緯度・経度）から天気情報を取得
     */
    public function getWeather(Request $request) {
        // 座標を取得
        $lat = $request->query('lat');  // 緯度
        $lon = $request->query('lon');  // 経度

        // テスト用
        if (!$lat || !$lon) {
            $lat = 35.1815;    // 名古屋の緯度
            $lon = 136.9066;   // 名古屋の経度
        }

        $apiKey = env('OPENWEATHER_API_KEY');
        $apiUrl = env('OPENWEATHER_API_URL');

        // 座標で天気情報を取得
        $response = Http::get("{$apiUrl}/weather", [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $apiKey,
            'units' => 'metric',
            'lang' => 'ja',
        ]);

        // 必要最低限の情報を返す（APIリクエスト成功時）
        if ($response->successful()) {
            $data = $response->json();

            return response()->json([
                'weather' => $data['weather'][0]['main'],    // 天気（英語）
                'temp' => $data['main']['temp'],             // 気温
            ]);
        }

        // エラー時
        return response()->json([
            'error' => '天気情報の取得に失敗',
            'status' => $response->status(),
            'message' => $response->json()
        ], 500);
    }
}
