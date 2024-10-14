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
        if (data && data.errors) {
            setErrors(data.errors);
        }
        });
    };

    return (
    <div className='login-modal'>
        <h1 className='login-header-text'>Log In</h1>
        <form onSubmit={handleSubmit} className='login-modal-input'>
            <label>
                Username or Email
                <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                />
            </label>
            <label>
                Password
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            {errors.credential && (
                <p>{errors.credential}</p>
            )}
            <button type="submit" className='login-button'>Log In</button>
        </form>
    </div>
    );
}

export default LoginFormModal;