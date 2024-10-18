import './Reviews.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaStar } from "react-icons/fa";
// import { FaHashtag } from "react-icons/fa";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem' ;
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';

import PageNotFound from '../PageNotFound';
import {getReviewsThunk} from '../../store/reviews';

export default function Reviews({spotId}){
    const dispatch =useDispatch();
    const reviews = useSelector((state) => state.reviews.reviewsState);
    const sessionUser = useSelector((state) => state.session.user);
    const spot = useSelector((state) => state.spots.spotDetailState[spotId])


 
    useEffect(() => {
		dispatch(getReviewsThunk(spotId));
	}, [dispatch,spotId]);

    if (!reviews) {
        return <PageNotFound />
    } else if (reviews.message) {
        return <h1>{reviews.message}</h1> 
    }


    // const deleteButtonClassName = (sessionUser && sessionUser.id===eachReview.User.id? 'delete-review-button' :'delete-review-button-hidden')
    return (
        <div className="reviews-container">
            {reviews.length > 0 ? (reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((eachReview,i) => (
                    <div className='review-host-header' key={i}>
                        <h3 className="review-user-name">{eachReview.User? eachReview.User.firstName : "Anonymous User"}</h3>
                        <p className="review-date">{new Date(eachReview.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                        <p className='review-text'>{eachReview.review}</p>
                        {sessionUser && sessionUser.id===eachReview.User.id &&
                            <button className='deleteButtonClassName'>
                                <OpenModalMenuItem
                                className="delete-review-modal"
                                itemText="Delete"
                                modalComponent={<ConfirmDeleteModal itemToDelete={"REVIEW"}/>}
                                />
                            </button>
                        }
                    </div> 
            ))
            ):(
                sessionUser && spot?.Owner &&sessionUser.id!==spot.Owner.id ?(
                    <h3 className="review-needed-text">Be the first to post a review!</h3>
                ) : (
                    <h3 className="review-needed-text">No reviews yet.</h3>
                )
            )
            }
        </div>
    )

}