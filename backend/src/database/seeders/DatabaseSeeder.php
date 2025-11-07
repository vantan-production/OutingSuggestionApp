<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    // CMD: php artisan db:seed --class=DatabaseSeeder
    public function run(): void
    {
        User::create([
            'name' => 'shion',
            'email' => 'shion@test.com',
            'password' => Hash::make('123456'),
        ]);
    }
}
