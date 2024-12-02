import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin } from '../../../redux/AdminSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.admin?.admin);

    // Function to validate email
    // const validateEmail = (email) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+ $/;
    //     return emailRegex.test(email);
    // };

    // Function to validate form fields
    const validateForm = () => {
        const newErrors = {};
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

        // Validate form fields before proceeding
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/admin/adminlogin',
                { email, password },
                { withCredentials: true }
            );

            if (response.data && response.data._id) {
                const adminData = {
                    _id: response.data._id,
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                    profileImage: response.data.profileImage,
                    token: response.data.token,
                };

                dispatch(addAdmin(adminData));
                localStorage.setItem('adminKey', response.data.token);

                alert(`Hello ${adminData.name}, you are successfully logged in!`);
                setTimeout(() => {
                    navigate("/adminhome");
                }, 100);
            } else {
                toast.error('Login failed: Invalid Credentials');
            }
        } catch (err) {
            console.log('Login Error:', err);
            const errorMessage = err.response?.data?.message || 'Invalid credentials, please try again';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2 className="title">Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`input ${errors.email ? 'error-input' : ''}`}
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={`input ${errors.password ? 'error-input' : ''}`}
                        />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>
                    <button type="submit" className="button">
                        Login
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminLogin;
