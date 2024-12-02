import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Edit.css';
import axios from 'axios';

const EditProfile = () => {
    const [user, setUser] = useState({ name: '', email: '', profileImage: '' });
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    // Fetch user info on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/home`, {
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

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

   // Handle update button click
const handleUpdate = async () => {
    try {
        // Using FormData to send image and other fields
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        
        // Append the selected image file only if it exists
        if (selectedImage) {
            formData.append('profileImage', selectedImage);
        }

        const response = await axios.put(
            'http://localhost:3000/user/update',
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        alert(response.data.message || 'Profile updated successfully!');
        navigate('/home')
    } catch (error) {
        console.log('Error updating user data', error);
        alert('Failed to update profile');
    }
};


    // Handle logout button click
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>

            {/* Display the existing profile image */}
            {user.image && (
                <div className="profile-image-container">
                    <img
                        src={`http://localhost:3000${user.image}`}
                        alt="Profile"
                        className="profile-image"
                    />
                </div>
            )}

            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="profileImage">Profile Image:</label>
                <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <div className="button-group">
                <button className="update-button" onClick={handleUpdate}>
                    Update
                </button>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
