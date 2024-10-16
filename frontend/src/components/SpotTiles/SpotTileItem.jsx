import { FaStar } from "react-icons/fa";


export default function SpotTileItem({ spot }) {
    return (
        <div className="SpotTileItem">
            <div className="SpotImageWrapper">
                <img
                    src={spot.previewImage ? spot.previewImage : "/images/sampleSpotImage.png"}
                    alt="previewImage"
                    className="SpotImage"
                />
                <div className="SpotTooltip">{spot.name}</div>
            </div>
            <div className="SpotTileItemDescription">
                <div className="SpotTileItemFirstRow">
                    <div><strong>{spot.city}, {spot.state}</strong></div>
                    {spot.avgRating? <div className="SpotTileItemStarRating">
                                            <FaStar />
                                            <i className="fa-solid fa-star SpotTileItemStar" /> {spot.avgRating}</div>
                                    :<div className="SpotTileItemStarRating"><strong>New</strong> </div>
                    }
                </div>
                <div className="SpotTileItemPrice"><strong>$ {spot.price}</strong> night</div>
            </div>
        </div>

    );
}