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
            <img src="/images/logo.svg" alt="Company Logo" className="logo-image" />
            GoVocay
        </NavLink>
        </li>
        {isLoaded && (
        <li>
            <ProfileButton user={sessionUser} />
        </li>
        )}
    </ul>
    );
}

export default Navigation;