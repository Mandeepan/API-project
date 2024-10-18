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

//get all the spots for current user ( no need to create another action and subpiece in reducer)
export const getUserSpotsThunk = () => async (dispatch) => {
	const response = await csrfFetch('/api/spots/current');
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

//create a new spot
const CREATE_SPOT ='spots/CREATE_SPOT';
export const createSpot =(spot) => {
    return{
        type: CREATE_SPOT,
        payload : spot
    }
}
export const createSpotThunk = (spot) => async (dispatch) => {
    const options ={
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(spot)
    }
    
    try {
        const response = await csrfFetch('/api/spots', options);
        const newSpot = await response.json();
		dispatch(createSpot(newSpot));
		return newSpot;
    } catch (err) {
        let error ={Error: err}
        const errRes= await error.json()
        return errRes
    }
}

// adding spot image to spotImage table at the backend
const ADD_SPOT_IMAGE = 'spots/ADD_SPOT_IMAGE';
const addSpotImage = (image) => ({
	type: ADD_SPOT_IMAGE,
	image,
});
export const addSpotImageThunk = (spotId, image) => async (dispatch) => {
    try{
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(image),
        });
        const newImage = await response.json();
		dispatch(addSpotImage(newImage));
		return newImage;
    }catch (err) {
        let error ={Error: err}
        const errRes= await error.json()
        return errRes
    }
}




const initialStates ={spotsState:{},spotDetailState:{},createSpotState:{}}

export default function spotsReducer(state = initialStates, action) {
    switch (action.type) {
        case GET_SPOTS: {
            const newState = {...state,spotsState:{} };
            const spotsArray = action.payload.Spots;
            spotsArray.forEach( (spot) =>{
                newState.spotsState[spot.id] =spot
            })
            return newState
        }
        case GET_SPOT_DETAIL: {
            return {
				...state,
				spotDetailState: {
					...state.spotDetailState,
					[action.payload.id]: action.payload,
				},
			};
        }
        case CREATE_SPOT: {
            return{
                ...state,
                createSpotState : action.payload
            }
        }
        case ADD_SPOT_IMAGE: {
			const newState = { ...state };
			const spot = newState.spotDetailState[action.image.spotId];
			if (spot) {
				spot.images = spot.images || [];
				spot.images.push(action.image);
			}
			return newState;
		}
        default: return state;
    }
}

