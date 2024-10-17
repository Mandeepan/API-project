import './Reviews.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaStar } from "react-icons/fa";
// import { FaHashtag } from "react-icons/fa";


import PageNotFound from '../PageNotFound';
import {getReviewsThunk} from '../../store/reviews';

export default function Reviews({spotId}){
    const dispatch =useDispatch();
    const reviews = useSelector((state) => state.reviews.reviewsState);
 
    useEffect(() => {
		dispatch(getReviewsThunk(spotId));
	}, [dispatch,spotId]);

    if (!reviews) {
        return <PageNotFound />
    } else if (reviews.message) {
        return <h1>{reviews.message}</h1> 
    }

    return (
        <div className="reviews-container">
            {console.log({reviews})}
            {reviews.length > 0 ? (reviews.map((eachReview,i) => (
                    <div className='review-host-header' key={i}>
                        <p>TO BE ADDED</p>
                        <h1>{eachReview.review}</h1>
                    </div> 
            ))
            ):(
                <p> TO BE EDITED : FIRST ONE TO REVIEW</p>
            )
            }
        </div>
    )

}