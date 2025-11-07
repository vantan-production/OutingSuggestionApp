<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    // ログイン処理
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'メールアドレスまたはパスワードが間違っています'
            ]);
        }
        Auth::login($user);

        return response()->json([
            'success' => true,
            'token' => $user->createToken('access_token')->plainTextToken
        ]);
    }

    // サインアップ
    public function signUp(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string|max:255', // 任意
            'email' => 'required|string|email|max:255|unique:users', // 必須
            'password' => 'required|string|min:8|confirmed', // 必須（確認用あり）
        ]);
        $name = $request["name"];
        $email = $request["email"];
        $password = $request["password"];

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);

        Auth::login($user);

        return response()->json([
            'success' => true,
            'user' => $user,
            'token' => $user->createToken('auth_token')->plainTextToken
        ]);
    }

    // ログアウト処理
    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
