// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
    <ul className='header-list'>
        <li>
        <NavLink to="/" className='logo-area'>
            <img src="/images/logo.svg" alt="Company Logo"  data-testid="logo" className="logo-image" />
            GoVocay
        </NavLink>
        </li>
        <ul className="header-right">
            {sessionUser && (
            <li>
                <NavLink to="/spots/new" className='create-spot-button'>
                Create a New Spot
                </NavLink>
            </li>
            )}
            {isLoaded && (
            <li>
                <ProfileButton user={sessionUser} />
            </li>
            )}
        </ul>
        
    </ul>
    );
}

export default Navigation;