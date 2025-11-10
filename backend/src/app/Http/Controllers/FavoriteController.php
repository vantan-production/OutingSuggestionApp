<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * お気に入り一覧取得
     */
    public function index(Request $request)
    {
        $favorites = Favorite::with('favoritable')
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($favorites);
    }

    /**
     * お気に入り追加
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'favoritable_id' => 'required|string',
            'favoritable_type' => 'required|string|in:App\\Models\\Store,App\\Models\\Event',
        ]);


        try {
            $favorite = Favorite::firstOrCreate([
                'user_id' => $request->user()->id,
                'favoritable_id' => $validated['favoritable_id'],
                'favoritable_type' => $validated['favoritable_type'],
            ]);
            
            return response()->json([
                'message' => 'お気に入りに追加しました',
                'favorite' => $favorite
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'お気に入りの追加に失敗しました',
            ], 500);
        }
    }

    /**
     * お気に入り削除
     */
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

    /**
     * 特定の対象がお気に入りされているかチェック
     */
    public function check(Request $request)
    {
        $validated = $request->validate([
            'favoritable_id' => 'required|string',
            'favoritable_type' => 'required|string|in:App\\Models\\Store,App\\Models\\Event',
        ]);


        $exists = Favorite::where('user_id', $request->user()->id)
            ->where('favoritable_id', $validated['favoritable_id'])
            ->where('favoritable_type', $validated['favoritable_type'])
            ->exists();
            
        return response()->json(['is_favorited' => $exists]);
    }
}
