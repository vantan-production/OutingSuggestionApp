<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'place_id',
        'name',
        'address',
        'opening_hours',
        'open_today',
        'images',
        'genre',
        'rating',
        'lat',
        'lon',
        'source_api',
    ];

    protected $casts = [
        'opening_hours' => 'array',
        'open_today' => 'boolean',
        'images' => 'array',
        'genre' => 'array',
        'rating' => 'float',
        'lat' => 'decimal:7',
        'lon' => 'decimal:7',
    ];

    // リレーション: お気に入り
    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    // この店舗をお気に入りしているユーザー
    public function favoritedByUsers()
    {
        return $this->morphToMany(User::class, 'favoritable', 'favorites');
    }
}
