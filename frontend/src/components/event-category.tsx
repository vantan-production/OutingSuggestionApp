export function EventCategory () {
    return (
        <div className=" w-80 h-72 rounded-lg overflow-hidden ">
            <img className="w-80 h-44" src="images/shop_01.jpeg" alt="stor-photo" />
            <div className=" w-80 h-36 bg-orange ">
                <ul className="inline-flex w-74 h-10 py-1 px-3 justify-between">
                    <li className="p w-18 h-8 bg-white rounded p-1">カテゴリ</li>
                    <li className="p w-18 h-8 bg-white rounded p-1">カテゴリ</li>
                    <li className="p w-18 h-8 bg-white rounded p-1">カテゴリ</li>
                </ul>
                <p className="h3 py-1 px-3">イベント名が入ります</p>
                <p className="h4 pb-1 px-3">イベント内容が入ります</p>
            </div>
        </div>
    )
};

export default EventCategory;