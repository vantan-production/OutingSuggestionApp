<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    // お気に入り一覧取得
    public function index(Request $request)
    {
        $favorites = Favorite::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($favorites);
    }

    // お気に入り追加
    public function store(Request $request)
    {
        $validated = $request->validate([
            'place_id' => 'required|string',
            'place_name' => 'required|string',
            'place_address' => 'nullable|string',

            
            'place_photo_url' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        try {
            $favorite = Favorite::create([
                'user_id' => $request->user()->id,
                ...$validated
            ]);
            
            return response()->json([
                'message' => 'お気に入りに追加しました',
                'favorite' => $favorite
            ], 201);
        } catch (\Exception $e) {
            // 既に登録済みの場合など
            return response()->json([
                'message' => 'すでにお気に入りに追加されています'
            ], 409);
        }
    }

    // お気に入り削除
    public function destroy(Request $request, $id)
    {
        $favorite = Favorite::where('user_id', $request->user()->id)
            ->where('id', $id)
            ->first();

        if (!$favorite) {
            return response()->json(['message' => 'お気に入りが見つかりません'], 404);
        }

        $favorite->delete();
        
        return response()->json(['message' => 'お気に入りから削除しました']);
    }

    // 特定のplace_idがお気に入りされているかチェック
    public function check(Request $request, $placeId)
    {
        $exists = Favorite::where('user_id', $request->user()->id)
            ->where('place_id', $placeId)
            ->exists();
            
        return response()->json(['is_favorited' => $exists]);
    }
}