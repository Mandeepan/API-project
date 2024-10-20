import { FaStar } from "react-icons/fa";


export default function SpotTileItem({ spot }) {
    const averageRatingFormatted = spot.avgRating ? parseFloat(spot.avgRating).toFixed(1) : "New";

    return (
        <div className="SpotTileItem" data-testid='spot-tile'>
            <div className="SpotImageWrapper" data-testid='spot-tooltip'>
                <img
                    src={spot.previewImage ? spot.previewImage : "/images/sampleSpotImage.png"}
                    alt="previewImage"
                    className="SpotImage"
                    data-testid='spot-thumbnail-image'
                />
                <div className="SpotTooltip" ><p data-testid='spot-name'>{spot.name}</p></div>
            </div>
            <div className="SpotTileItemDescription">
                <div className="SpotTileItemFirstRow">
                    <div data-testid='spot-city'>
                        <strong>{spot.city}, {spot.state}</strong>
                    </div>
                    <div className="SpotTileItemStarRating" data-testid='spot-rating'>
                                            <FaStar />
                                            <i className="fa-solid fa-star SpotTileItemStar" /> {averageRatingFormatted}
                    </div>
                </div>
                <div className="SpotTileItemPrice" data-testid='spot-price'><strong>$ {spot.price.toLocaleString()}</strong> night</div>
            </div>
        </div>

    );
}