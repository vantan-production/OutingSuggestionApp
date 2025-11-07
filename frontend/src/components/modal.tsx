`use client`
import { useState } from "react";

function Modal(props: { title: string}) {
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => {
        setIsOpen(false);
    }
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div>
                <h2 className="h2-bold text-black">{props.title}</h2>
                <p className="p text-black">全ての機能を利用するにはログインが必要です</p>
                <button>
                    <a href="/login" className="bg-blue text-white rounded-3 p-2 p w-30 h-10">ログイン</a>
                </button>
                <button onClick={handleClose}>
                    <p className="p text-black bg-orange rounded-3 p-2 w-30 h-10">このまま続ける</p>
                </button>
            </div>
        </div>
    )
}

export default Modal;