import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { logoutUser } from '../../../redux/UserSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // Fetch user info from local storage or backend
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/home', {
                    withCredentials: true,
                });
                setUser(response.data.user);
            } catch (error) {
                console.log('Error fetching user data', error);
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate]);

    // Logout handler
    const handleLogout = () => {
        dispatch(logoutUser())
        localStorage.removeItem('token')
        navigate('/login')
    };

    // Navigate to edit profile
    const handleEditProfile = () => {
        navigate('/update');
    };

    // Render user information
    return (
        <div className="home-container">
            {user ? (
                <div className="profile-card">
                    <img
                         src={user.profileImage ? `http://localhost:3000${user.profileImage}` : 'default-profile.png'}
                        alt="Profile"
                        className="profile-image"
                    />
                    <h2 className="username">{user.name}</h2>
                    <p className="email">{user.email}</p>
                    <div className="button-group">
                        <button className="edit-button" onClick={handleEditProfile}>
                            Edit Profile
                        </button>
                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
};

export default Home;
