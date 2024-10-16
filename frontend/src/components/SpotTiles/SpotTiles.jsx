import './SpotTiles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getAllSpots} from '../../store/spots';
import SpotTileItem from './SpotTileItem';
import { NavLink } from 'react-router-dom';
import PageNotFound from '../PageNotFound';

export default function SpotTiles(){
    const dispatch =useDispatch();
    const spots = useSelector((state) => state.spots.allSpots);
 
    useEffect(() => {
		dispatch(getAllSpots());
	}, [dispatch]);
    console.log("!!!!!!!!!")
    console.log(spots)
    
    if (!spots || spots.length === 0) {
        return <PageNotFound />
    }

    
    return <>
        <div className="SpotTiles">
            {spots.map((spot, i) =>
                <NavLink key={i} to={`/spots/${spot.id}`}>
                    <SpotTileItem spot={spot} />
                </NavLink>)
            }
        </div >
    </>
}


