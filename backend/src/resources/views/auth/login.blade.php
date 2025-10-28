<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>ログインテスト</h1>

    <form action="{{ route('login.submit') }}" method="POST">

        @csrf
        <label>メールアドレス</label>
        <input type="email" name="email">

        <label>パスワード</label>
        <input type="password" name="password">

        <button type="submit">ログイン</button>
    </form>

    @if (!empty($error))
        <p>{{ $error }}</p>
    @endif
</body>
</html>