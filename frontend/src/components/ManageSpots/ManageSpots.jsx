

import './ManageSpots.css'
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getUserSpotsThunk} from '../../store/spots';
import { NavLink } from 'react-router-dom';
import PageNotFound from '../PageNotFound';





function ManageSpotTileItem({ spot }) {
    const averageRatingFormatted = spot.avgRating ? spot.avgRating.toFixed(1) : "New";

    return (
        <div className="SpotTileItemNoButton">
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




export default function ManageSpots(){
    const dispatch =useDispatch();
    const spots = useSelector((state) => Object.values(state.spots.spotsState));
 
    useEffect(() => {
		dispatch(getUserSpotsThunk());
	}, [dispatch]);
    
    if (!spots || spots.length === 0 ) {
        return <PageNotFound />
    }



    return (
        <div className="manage-spot-container">
            <div className="manage-spot-header">
                <h1 className="page-title">Manage Spots</h1>
                <NavLink className="manage-create-spot-button" id="header-button" to={`/spots/new`}>Create a New Spot</NavLink>
            </div>
            <div className="SpotTiles">
                {spots.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((spot, i) =>
                <div className="SpotTileItem" key={i}>
                    <NavLink key={i} to={`/spots/${spot.id}`}>
                        <ManageSpotTileItem spot={spot} />
                    </NavLink>
                    <div className="update-delete-button" key={i}>
                        <button className="update-button">Update</button>
                        <button className="delete-button">Delete</button>
                    </div>
                </div>
                )}
            </div >
            
        </div>
    )
}