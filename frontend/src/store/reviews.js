import { csrfFetch } from './csrf';

//get all the reviews
const GET_REVIEWS = 'reviews/GET_REVIEWS';
export const getReviews = (reviews) => {
	return {
		type: GET_REVIEWS,
		payload: reviews,
	};
};
export const getReviewsThunk = (spotId) => async (dispatch) => {
    // console.log("==========REVIEW THUNK==========")
    // console.log(spotId)
    // let spotIdString = spotId;
    // if (typeof(spotId)!=='string') spotIdString=spotId.toString();
    // const response = await csrfFetch(`/api/spots/1/reviews`);
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

const initialStates ={reviewsState:[]}

export default function reviewsReducer(state = initialStates, action) {
    switch (action.type) {
        case GET_REVIEWS: {
            return { ...state, reviewsState: action.payload };
        }
        default: return state;
    }
}
