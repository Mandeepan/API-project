import './SpotTiles.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getAllSpots} from '../../store/spots';
import SpotTileItem from './SpotTileItem';
import * as PageNotFound from '../PageNotFound';

export default function SpotTiles(){
    const dispatch =useDispatch();
    const spots = useSelector((state) => state.spots.allSpots);
 
    useEffect(() => {
		dispatch(getAllSpots());
	}, [dispatch]);
    console.log("!!!!!!!!!")
    console.log(spots)
    // if (!spots) return (<PageNotFound /> )
    
    return(
        <div className="SpotTiles">
            {spots && spots.map(spot => <SpotTileItem spot={spot}/> )} 
        </div>
    )
}


            