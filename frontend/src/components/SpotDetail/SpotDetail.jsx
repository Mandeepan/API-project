import './SpotDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";

import {getSpotDetailThunk} from '../../store/spots';
import PageNotFound from '../PageNotFound';
import Reviews from '../Reviews';

import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal'

export default function SpotDetail(){
    const dispatch =useDispatch();
    const { spotId } = useParams();
    const spotDetail = useSelector((state) => state.spots.spotDetailState[spotId]);
    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector((state) => state.reviews.reviewsState);
 
    useEffect(() => {
		dispatch(getSpotDetailThunk(spotId));
	}, [dispatch,spotId]);
    
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
    if (spotDetail && spotDetail.SpotImages) {
        spotDetail.SpotImages.forEach(img => {
            if (img.preview) {
                previewImageURL=img.url
            } else {
                nonPreviewImageURL.unshift(img.url)
            }
        })
    }
    nonPreviewImageURL = nonPreviewImageURL.slice(0, 4);
    let reviewWordText = spotDetail.numReviews >=2? 'Reviews' :'Review';
    const averageRatingFormatted = spotDetail.avgStarRating ? spotDetail.avgStarRating.toFixed(1) : "New";
    const noReviewClassName=spotDetail.numReviews? "review-count" : "review-count-hidden";

    let postReviewClassName = 'post-review-button-hidden';
    if (sessionUser) {
        const isSpotOwner = sessionUser.id=== spotDetail.ownerId;
        let isReviewOwner =false ;
        if (reviews) { 
            reviews.forEach(review => {
                if (review.userId === sessionUser.id) {isReviewOwner=true}
            })
        }
        if (!isSpotOwner && !isReviewOwner) { postReviewClassName='post-review-button'}
    } 

    
    return (
        <div className="spot-details" data-testid='spot-tile'>
            {/*header*/}
            <header className="spot-header" >
                <h1 className="spot-name" data-testid='spot-name'>{spotDetail.name}</h1>
                <div  className="spot-location" data-testid='spot-location'>
                    <p data-testid='spot-city'>{spotDetail.city}</p>
                    <p> , {spotDetail.state}</p>
                    <p> , {spotDetail.country}</p>
                </div>
            </header>
            {/*image section*/}
            <div className="spot-images">
                <div className="preview-image" data-testid='spot-large-image'>
                <img src={previewImageURL} alt="Spot Preview" />
                </div>
                <div className="small-images" >
                {nonPreviewImageURL.slice(0, 4).map((imageUrl, index) => (
                    <img key={index} src={imageUrl} alt={`Spot Image ${index + 1}`} className="small-image" data-testid='spot-small-image'/>
                ))}
                </div>
            </div>
            <div className="description-callout-container">
                {/* Description Section */}
                <div className="spot-description">
                    <h3 data-testid='spot-host'>Hosted by {spotDetail.Owner?.firstName} {spotDetail.Owner?.lastName}</h3>
                    <p data-testid='spot-description'>{spotDetail.description}</p>
                </div>
                {/* Callout Information Box */}
                <div className="callout-info-box" data-testid='spot-callout-box'>
                    <div className="callout-info" data-testid='review-heading'>
                            <h3 className="price" data-testid='spot-price'><strong>${spotDetail.price.toLocaleString()} </strong> night</h3>
                            <p className="average-rating"> <FaStar /> <strong>{averageRatingFormatted}</strong></p>
                            <p className={noReviewClassName} data-testid='spot-rating'> • <FaHashtag /> <strong>{spotDetail.numReviews} {reviewWordText}</strong></p>
                    </div>
                    <button className="reserve-button" data-testid='reserve-button' onClick={handleReserveClick}>Reserve</button>
                </div>
            </div>
            <div className="review-section">
                <div className="review-star-summary" data-testid='reviews-heading'>
                            <p className="average-rating" > <FaStar /> <strong>{averageRatingFormatted}</strong></p>
                            <p className={noReviewClassName} data-testid='review-count'> • <FaHashtag /> <strong>{spotDetail.numReviews} {reviewWordText}</strong></p>
                </div>
                <div >
                    <button className={postReviewClassName} data-testid='review-button'>
                    <OpenModalMenuItem
                        className="review-modal"
                        itemText="Post Your Review"
                        modalComponent={<ReviewFormModal spotId={spotId} />}
                        />
                    </button>
                </div>
                <Reviews spotId={spotId} />
            </div>
        </div>

    )
}