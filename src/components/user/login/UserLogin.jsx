import React, { useState } from 'react';
import axios from 'axios';
import './UserLogin.css';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { addUser } from '../../../redux/UserSlice';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Enter a valid email address.';
        }

        // Password validation
        if (!password.trim()) {
            newErrors.password = 'Password is required.';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // No errors => valid form
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) return; // Stop if validation fails

        try {
            const response = await axios.post(
                'http://localhost:3000/user/login',
                { email, password },
                { withCredentials: true }
            );

            // If login is successful, update Redux store and navigate to home
            if (response.status === 200) {
                toast.success('Login successful!');
                console.log('User Info:', response.data.user);

                // Update the Redux state with the logged-in user data
                dispatch(addUser(response.data.user));

                // Navigate to the home page
                navigate('/home');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Invalid email or password!');
            } else {
                toast.error('An error occurred during login.');
            }
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2 className="title">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`input ${errors.email ? 'input-error' : ''}`}
                            id="email"
                        />
                        {errors.email && <small className="error">{errors.email}</small>}
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={`input ${errors.password ? 'input-error' : ''}`}
                            id="password"
                        />
                        {errors.password && <small className="error">{errors.password}</small>}
                    </div>
                    <button type="submit" className="button">
                        Login
                    </button>
                </form>
                <p className="register-link">
                    Don't have an account? <Link to="/">Sign Up</Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserLogin;
