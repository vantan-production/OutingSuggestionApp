import StoreList from "./store-list";

function FavoriteList(){
    return(
        <div className="relative">
            <StoreList/>

            <button className="absolute bg-gray-200 p-1.5 rounded-5 bottom-5 right-1">
                <img src="/images/delete-btn.svg" alt="" />
            </button>
        </div>
    );
}

export default FavoriteList;