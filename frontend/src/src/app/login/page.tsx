'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

function LoginForm() {
    // フォームのテキスト入力監視
    const [ text, setText] = useState('')

    const [credentials, setCredentials] = useState({
        id: '',
        password: '',
    })
    const router = useRouter()

    // フォームの有効無効監視
    const isForm = credentials.id.trim() !== '' && credentials.password.trim() !== ''

    return (
        <div className="bg-beige h-screen">
            <div className="flex items-center justify-center m-8">
                <img src="/images/takamiuta.png" alt="app-logo" className="w-53 h-33" />
            </div>
            <div className="flex text-start w-70 h-20 items-center justify-between mx-4">
                <button onClick={()  => router.back()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <path d="M11.1667 21.0833L1.25 11.1667M1.25 11.1667L11.1667 1.25M1.25 11.1667H21.0833" stroke="black" strokeWidth="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <h1 className="h1 w-48 h-14 bg-blue text-white rounded-lg flex items-center justify-center">ログインページ</h1>
            </div>
            <section className="mx-4">
                <h2 className="h2-bold text-black mb-4">メールアドレスの入力</h2>
                <input type="email" value={credentials.id || text} onChange={(e) => setCredentials({ ...credentials, id: e.target.value })} placeholder="メールアドレスを入力" className="w-full h-13 border rounded-3 p-2 border-solid border-orange outline-[0.33px] outline-none" />
            </section>
            <section className="mx-4">
                <h2 className="h2-bold text-black mb-4">パスワードの入力</h2>
                <input type="password" value={credentials.password || text} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} placeholder="パスワードを入力" className="w-full h-13 border rounded-3 p-2 border-solid border-orange outline-[0.33px] outline-none" />
            </section>
            <button className="w-full flex justify-end">
                <div className="bg-[#3D83EC] w-37 h-8 relative rounded-3 m-2.5 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#F7F7F7]/30 rounded-3 flex items-center justify-center">
                    {/* アカウントをお持ちでない方はこちらをクリックしたらsignupページに遷移する */}
                        <a href="/signup" className="text-white text-center mini">アカウントをお持ちでない方はこちら</a>
                    </div>
                </div>
            </button>
            <button 
            className={`flex justify-center items-center fixed bottom-0 my-6 w-93 h-17 bg-blue rounded-5 ${isForm ? "opacity-100" : "opacity-30"}`}
            onClick={() => router.push('/top')}
            disabled = {!isForm} >
                <h2 className="h2-bold text-white">ログイン</h2>
            </button>
        </div>
    );
}

export default LoginForm;