import './SpotTiles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getSpotsThunk} from '../../store/spots';
import SpotTileItem from './SpotTileItem';
import { Link } from 'react-router-dom';
import PageNotFound from '../PageNotFound';

export default function SpotTiles(){
    const dispatch =useDispatch();
    const spots = useSelector((state) => Object.values(state.spots.spotsState));
 
    useEffect(() => {
		dispatch(getSpotsThunk());
	}, [dispatch]);
    
    if (!spots || spots.length === 0 ) {
        return <PageNotFound />
    }

    
    return <>
        <div className="SpotTiles" data-testid='spots-list'>
            {spots.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((spot, i) =>
                <Link key={i} to={`/spots/${spot.id}`} data-testid='spot-link'>
                    <SpotTileItem spot={spot} />
                </Link>)
            }
        </div >
    </>
}


