import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/ModalContext/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();



    const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        setErrors({});
        return dispatch(
        sessionActions.signup({
            email,
            username,
            firstName,
            lastName,
            password
        })
        )
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            console.log("========BACKEND RESPONSE DATA=======");
            console.log(data)
            if (data?.errors) {
            setErrors(data.errors);

            }
        });
    }
    return setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field"
    });
    };

    const isAnyFieldEmpty= !email || !username || !firstName || !lastName || !password || !confirmPassword ;
    const isUserNameTooShort = username.length <4;
    const isPasswordTooShort = password.length <6;
    const disableSignUpButton = isAnyFieldEmpty || isUserNameTooShort || isPasswordTooShort;

    // console.log('++++++++++++ERRORS++++++++')
    // console.log(errors.email)
    // console.log(errors.username)

    return (
    <div className='signup-modal' data-testid='sign-up-form'>
        <h1 className='signup-header-text'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='signup-modal-input'>
        <label>
            Email
            <input
            type="text"
            value={email}
            data-testid='email-input'
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        {errors.email && <p data-testid='email-error-message'>{errors.email}</p>}
        <label>
            Username
            <input
            type="text"
            value={username}
            data-testid='username-input'
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </label>
        {errors.username && <p data-testid='username-error-message'>{errors.username}</p>}
        <label>
            First Name
            <input
            type="text"
            value={firstName}
            data-testid='first-name-input'
            onChange={(e) => setFirstName(e.target.value)}
            required
            />
        </label>
        {errors.firstName && <p >{errors.firstName}</p>}
        <label>
            Last Name
            <input
            type="text"
            value={lastName}
            data-testid='last-name-input'
            onChange={(e) => setLastName(e.target.value)}
            required
            />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
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
        {errors.password && <p>{errors.password}</p>}
        <label>
            Confirm Password
            <input
            type="password"
            value={confirmPassword}
            data-testid='confirm-password-input'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </label>
        {errors.confirmPassword && (
            <p>{errors.confirmPassword}</p>
        )}
        <button type="submit" className='signup-button' disabled={disableSignUpButton} data-testid='form-sign-up-button'>Sign Up</button>
        </form>
    </div>
    );
}

export default SignupFormModal;