// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/ModalContext/Modal';
import './LoginForm.css';

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
            // setErrors(data.errors);
            setErrors({credential:"The provided credentials were invalid"})
        }
        });
    };

    const handleDemoUserSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ 
            credential:"demo@user.io", 
            password:"password"
            }))
            .then(closeModal)
        };

    const disableLogInButton = credential.length < 4 || password.length < 6
    
    return (
    <div className='login-modal' data-testid='login-modal'>
        <h1 className='login-header-text'>Log In</h1>
        <form onSubmit={handleSubmit} className='login-modal-input'>
            <label>
                Username or Email
                <input
                type="text"
                value={credential}
                data-testid='credential-input'
                onChange={(e) => setCredential(e.target.value)}
                required
                />
            </label>
            <label>
                Password
                <input
                type="password"
                value={password}
                data-testid='password-input'
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            {errors.credential && (
                <p>{errors.credential}</p>
            )}
            <button type="submit" className='login-button' disabled={disableLogInButton} data-testid='login-button'  >Log In</button>
            <a onClick={handleDemoUserSubmit} className="demo-user-tag" data-testid='demo-user-login' >Log in as Demo User</a>
        </form>
    </div>
    );
}

export default LoginFormModal;