import { csrfFetch } from './csrf';


const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
export const getSpots = (spots) => {
	return {
		type: GET_ALL_SPOTS,
		payload: spots,
	};
};

export const getAllSpots = () => async (dispatch) => {
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



export default function spotsReducer(state = {}, action) {
    switch (action.type) {
        case GET_ALL_SPOTS: {
			return { ...state, allSpots: action.payload.Spots};
        }
        default: return state;
    }
}

