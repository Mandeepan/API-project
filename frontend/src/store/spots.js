import { csrfFetch } from './csrf';

//get all the spots
const GET_SPOTS = 'spots/GET_SPOTS';
export const getSpots = (spots) => {
	return {
		type: GET_SPOTS,
		payload: spots,
	};
};
export const getSpotsThunk = () => async (dispatch) => {
	const response = await csrfFetch('/api/spots');
	try {
        const spots = await response.json();
		dispatch(getSpots(spots));
		return spots;
    } catch (err) {
        let error ={Error: err}
        const errRes= await error.json()
        return errRes
    }
};

//get spot by spotId : for spot detail page
const GET_SPOT_DETAIL = 'spots/GET_SPOT_DETAIL';
export const getSpotDetail = (spotDetail) => {
	return {
		type: GET_SPOT_DETAIL,
		payload: spotDetail,
	};
};
export const getSpotDetailThunk = (spotId) => async (dispatch) => {
    // console.log("+++");
    // console.log(`/api/spots/${spotId}`)
	const response = await csrfFetch(`/api/spots/${spotId}`);
	try {
        const spotDetail = await response.json();
		dispatch(getSpotDetail(spotDetail));
		return spotDetail;
    } catch (err) {
        let error ={Error: err}
        const errRes= await error.json()
        return errRes
    }
};

const initialStates ={spotsState:{},spotDetailState:{}}

export default function spotsReducer(state = initialStates, action) {
    switch (action.type) {
        case GET_SPOTS: {
            const newState = {...state,spotsState:{} };
            const spotsArray = action.payload.Spots;
            spotsArray.forEach( (spot) =>{
                newState.spotsState[spot.id] =spot
            })
            return newState
			// return { ...state, spotsState: action.payload.Spots};
            // const newState = {...state,spotsState:{} };
            // newState.spotsState = action.payload.Spots;
            // return newState
        }
        case GET_SPOT_DETAIL: {
            return {
				...state,
				spotDetailState: {
					...state.spotDetailState,
					[action.payload.id]: action.payload,
				},
			};
            // const newState = { ...state };
            // newState.spotDetailState = action.payload;
            // return newState
        }
        default: return state;
    }
}

