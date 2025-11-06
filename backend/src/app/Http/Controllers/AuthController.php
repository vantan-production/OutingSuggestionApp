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
    public function Login(Request $request) {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return response()->json([
                'error' => 'メールアドレスまたはパスワードが間違っています'
            ], 401);
        }
        Auth::login($user);

        return response()->json([
            'message' => 'ログインに成功しました',
            'token' => $user->createToken('auth_token')->plainTextToken,
        ], 200);
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
        auth()->login($user);

        // 次のページへ移動
        return redirect()->route('top');
    }

    // ログアウト処理
    public function Logout() {

    }
}
