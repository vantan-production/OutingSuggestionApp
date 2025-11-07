<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'start_datetime',
        'end_datetime',
        'address',
        'site_address',
        'genre',
    ];

    protected $casts = [
        'start_datetime' => 'datetime',
        'end_datetime' => 'datetime',
    ];

    // リレーション: お気に入り
    public function favorites()
    {
        return $this->morphMany(Favorite::class, 'favoritable');
    }

    // このイベントをお気に入りしているユーザー
    public function favoritedByUsers()
    {
        return $this->morphToMany(User::class, 'favoritable', 'favorites');
    }
}