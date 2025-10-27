<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>サインインテスト</h1>

    <form action="{{ route('sign_in.submit') }}" method="POST">

        @csrf
        <label>メールアドレス</label>
        <input type="email" name="email">

        <label>パスワード</label>
        <input type="password" name="password">
        
        <label>パスワード確認</label>
        <input type="password" name="password_confirmation">
        
        <label>名前</label>
        <input type="text" name="name">

        <button type="submit">アカウントを作成する</button>
    </form>

    @if (!empty($error))
        <p>{{ $error }}</p>
    @endif
</body>
</html>