import { csrfFetch } from './csrf';
import { getSpotDetailThunk } from './spots';
//get all the reviews
const GET_REVIEWS = 'reviews/GET_REVIEWS';
export const getReviews = (reviews) => {
	return {
		type: GET_REVIEWS,
		payload: reviews,
	};
};
export const getReviewsThunk = (spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
	try {
        const reviews = await response.json();
		dispatch(getReviews(reviews.Reviews));
		return reviews;
    } catch (err) {
        let error ={Error: err}
        const errRes= await error.json()
        return errRes
    }
};

//create review
const CREATE_REVIEW = 'reviews/ADD_REVIEW';
const createReview = (review) => {
	return {
		type: CREATE_REVIEW,
		payload: review,
	};
};
export const createReviewThunk = (review, spotId) => async (dispatch) => {
	try{
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        });
        const reviewRes = await response.json();
        dispatch(createReview(reviewRes));
        // update the spot detail page, such as average rating
        await dispatch(getSpotDetailThunk(spotId));
        // update review page
        await dispatch(getReviewsThunk(spotId));
        return reviewRes;
    }catch (err) {
        let error ={Error: err}
        return error
    }
    
};

const initialStates ={reviewsState:[]}

export default function reviewsReducer(state = initialStates, action) {
    switch (action.type) {
        case GET_REVIEWS: {
            return { ...state, reviewsState: action.payload };
        }
        case CREATE_REVIEW:{
            return { ...state, reviewsState: [...state.reviewsState, action.payload] };
        }
        default: return state;
    }
}
