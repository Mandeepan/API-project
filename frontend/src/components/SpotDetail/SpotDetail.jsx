import './SpotDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";

import {getSpotDetailThunk} from '../../store/spots';
// import SpotTileItem from './SpotTileItem';
// import { NavLink } from 'react-router-dom';
import PageNotFound from '../PageNotFound';


export default function SpotDetail(){
    const dispatch =useDispatch();
    const { spotId } = useParams();
    const spotDetail = useSelector((state) => state.spots.spotDetailState[spotId]);
 
    useEffect(() => {
		dispatch(getSpotDetailThunk(spotId));
	}, [dispatch]);
    
    if (!spotDetail || spotDetail.length === 0) {
        return <PageNotFound />
    } else if (spotDetail.message) {
        return <h1>{spotDetail.message}</h1>
    } 
    
    const handleReserveClick = () => {
        alert('Feature coming soon');
      };
    
    const defaultUrl ="/images/sampleSpotImage.png"; 
    let previewImageURL = defaultUrl;
    let nonPreviewImageURL = [defaultUrl,defaultUrl,defaultUrl,defaultUrl];
    spotDetail.SpotImages.forEach(img => {
        if (img.preview) {
            previewImageURL=img.url
        } else {
            nonPreviewImageURL.unshift(img.url)
        }
    })
    nonPreviewImageURL = nonPreviewImageURL.slice(0, 4);
    let reviewWordText = spotDetail.numReviews >=2? 'Reviews' :'Review';
    

    return (
        <div className="spot-details">
            {/*header*/}
            <header className="spot-header">
                <h1 className="spot-name">{spotDetail.name}</h1>
                <p className="spot-location">{spotDetail.city}, {spotDetail.state}, {spotDetail.country}</p>
            </header>
            {/*image section*/}
            <div className="spot-images">
                <div className="preview-image">
                <img src={previewImageURL} alt="Spot Preview" />
                </div>
                <div className="small-images">
                {nonPreviewImageURL.slice(0, 4).map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`Spot Image ${index + 1}`} className="small-image" />
                ))}
                </div>
            </div>
            <div className="description-callout-container">
                {/* Description Section */}
                <div className="spot-description">
                    <h3>Hosted by {spotDetail.Owner.firstName} {spotDetail.Owner.lastName}</h3>
                    <p>{spotDetail.description}</p>
                </div>
                {/* Callout Information Box */}
                <div className="callout-info-box">
                    <div className="callout-info">
                        <h3 className="price"><strong>${spotDetail.price} </strong> night</h3>
                        <p className="average-rating"> <FaStar /> <strong>{spotDetail.avgStarRating? spotDetail.avgStarRating : "New"}</strong></p>
                        <p className="review-count"> <FaHashtag /> <strong>{spotDetail.numReviews} {reviewWordText}</strong></p>
                    </div>
                    <button className="reserve-button" onClick={handleReserveClick}>Reserve</button>
                </div>
            </div>
            
        </div>

    )
}