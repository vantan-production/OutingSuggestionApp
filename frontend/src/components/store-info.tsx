export function StoreInfo () {
    return (
        <div className=" w-44 h-44 rounded-lg overflow-hidden ">
            <img className=" w-44 h-24 " src="/images/shop_02.jpeg" alt="store-photo" />
            <div className=" bg-orange  w-44 h-20 p-1 ">
                <ul>
                    <li className=" text-base mx-1 ">店名が入ります</li>
                    <li className=" text-xl text-beige mx-1 ">営業時間中</li>
                </ul>
                <div className=" w-40 inline-flex mx-1 ">
                    <p className="text-base ">1.6km</p>
                    <img className=" w-5 h-5 mt-1 " src="images/black-star.png" alt="star" />
                    <p>4.6</p>
                </div>
            </div>
        </div>
    )
};

export default StoreInfo;