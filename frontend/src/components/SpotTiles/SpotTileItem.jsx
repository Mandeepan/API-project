import { FaStar } from "react-icons/fa";


export default function SpotTileItem({ spot }) {
    const averageRatingFormatted = spot.avgRating ? spot.avgRating.toFixed(1) : "New";

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
                    <div className="SpotTileItemStarRating">
                                            <FaStar />
                                            <i className="fa-solid fa-star SpotTileItemStar" /> {averageRatingFormatted}
                    </div>
                </div>
                <div className="SpotTileItemPrice"><strong>$ {spot.price.toLocaleString()}</strong> night</div>
            </div>
        </div>

    );
}