<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //ログインページ表示
    public function LoginForm(Request $request) {
        return view('auth.login');
    }

    // ログイン処理
    public function login(Request $request)
    {
        $email = $request["email"];
        $password = $request["password"];

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
          'token' => $user->createToken('auth_token')->plainTextToken
        ]);
    }

    // サインアップ
    public function signUp(Request $request)
    {
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
          'token' => $user->createToken('auth_token')->plainTextToken
        ]);
    }

    // サインインページ表示
    public function RegisterForm(Request $request) {
        return view('auth.sign_in');
    }

    // サインイン処理
    public function Register(Request $request) {
        // 入力された値を保存
        $name = $request["name"];
        $email = $request["email"];
        $password = $request["password"];
        $password_confirmation = $request["password_confirmation"];

        // パスワード確認とパスワードが一致しているかを確認
        if ($password !== $password_confirmation) {
            $error = "パスワードが一致しません";
            return view("auth.sign_in", compact("error"));
        }

        // 登録されているメールかを確認
        if (User::where('email', $email)->exists()) {
            $error = "既に登録されているメールアドレスです";
            return view("auth.sign_in", compact("error"));
        }

        // アカウントを作成時にデータを保存
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        // ログイン処理
        Auth::login($user);

        // 次のページへ移動
        return redirect()->route('top');
    }

    // ログアウト処理
    public function Logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
