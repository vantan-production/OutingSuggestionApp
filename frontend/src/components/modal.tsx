`use client`

function Modal(props: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-0 flex justify-center items-center" onClick={props.onClose}>
            <div className="bg-beige rounded-3 px-4 py-6 w-83 h-60 flex flex-col justify-between items-center text-center"
            onClick={(e) => e.stopPropagation()}
            >
                <h2 className="h2-bold text-black">ログインが必要です。</h2>
                <p className="p text-black text-start">全ての機能を利用するにはログインが必要です。</p>
                <div className="flex justify-between w-full">
                    <button onClick={props.onClose}>
                        <p className="p text-black bg-orange rounded-3 p-2 w-33 h-10 block">このまま続ける</p>
                    </button>
                    <button>
                        <a href="/login" className="bg-blue text-white rounded-3 p-2 p w-33 h-10 block">ログインする</a>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;