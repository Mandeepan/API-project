

import './ManageSpots.css'
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getUserSpotsThunk} from '../../store/spots';
import {deleteSpotThunk} from '../../store/spots';
import { NavLink, useNavigate } from 'react-router-dom';
import PageNotFound from '../PageNotFound';
// import OpenModalMenuItem from '../Navigation/OpenModalMenuItem' ;
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { useModal } from '../../context/ModalContext/Modal';



function ManageSpotTileItem({ spot }) {
    
    const averageRatingFormatted = typeof spot.avgRating === 'number' && !isNaN(spot.avgRating)
    ? spot.avgRating.toFixed(1)
    : "New";


    
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
    const navigate =useNavigate();
    const spots = useSelector((state) => Object.values(state.spots.spotsState));
    const { setModalContent, closeModal } = useModal();
 
    useEffect(() => {
		dispatch(getUserSpotsThunk());
	}, [dispatch]);
    
    if (!spots || spots.length === 0 ) {
        return <PageNotFound />
    }

    const handleUpdate=(e, spotId)=>{
        e.stopPropagation();
        navigate(`/spots/${spotId}/edit`);
    }

    const handleDelete =(spotId) =>{
        setModalContent(
			<ConfirmDeleteModal
                itemToDelete={"SPOT"}
				onConfirm={() => {
					dispatch(deleteSpotThunk(spotId)).then(() => {
						closeModal();
					});
				}}
				onCancel={() => {
					closeModal();
				}}
			/>
		);
    }

    return (
        <div className="manage-spot-container" data-testid='user-spots'>
            <div className="manage-spot-header">
                <h1 className="page-title">Manage Spots</h1>
                {/* <NavLink className="manage-create-spot-button" id="header-button" to={`/spots/new`}>Create a New Spot</NavLink> */}
                <button className="manage-create-spot-button" id="header-button">
                    <NavLink to={`/spots/new`} role="link">
                        Create a New Spot
                    </NavLink>
                </button>
            </div>
            <div className="SpotTiles">
                {spots.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((spot, i) =>
                <div className="SpotTileItem" key={i}>
                    <NavLink key={i} to={`/spots/${spot.id}`}>
                        <ManageSpotTileItem spot={spot} />
                    </NavLink>
                    <div className="update-delete-button" key={i}>
                        <button className="update-button" onClick={(e)=> handleUpdate(e,spot.id)}>Update</button>
                        <button className="delete-button" 
                                onClick={(e) => {
										e.stopPropagation();
										handleDelete(spot.id);
									}}>
                            Delete
                        </button>
                    </div>
                </div>
                )}
            </div >
            
        </div>
    )
}