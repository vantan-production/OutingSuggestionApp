<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'favoritable_id',
        'favoritable_type',
    ];

    // リレーション: ユーザー
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // ポリモーフィックリレーション: お気に入り対象（店舗またはイベント）
    public function favoritable()
    {
        return $this->morphTo();
    }
}