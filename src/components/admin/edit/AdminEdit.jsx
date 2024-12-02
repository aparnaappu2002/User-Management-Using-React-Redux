import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminEdit.css';

const AdminEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Fetch the user details based on the userId
    useEffect(() => {
        function fetchUser() {
            axios.get(`http://localhost:3000/admin/edituser/${id}`, { withCredentials: true })
                .then((res) => {
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setPhone(res.data.phone);
                    setProfileImage(res.data.profileImage);
                    setImagePreview(`http://localhost:3000${res.data.profileImage}`);
                    console.log("@admin edit response", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        fetchUser();
    }, [id]);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file); // Set the file for upload
        setImagePreview(URL.createObjectURL(file)); // Generate preview for display
    };

  

    const handleSave = async () => {
       
    
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            if (profileImage instanceof File) {
                formData.append("profileImage", profileImage); // Only append file if it’s a new upload
            }

            const response = await axios.put("http://localhost:3000/admin/update",formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            console.log(response.data);

                navigate("/dashboard");
           

        } catch (err) {
            console.log("Error saving user:", err);
        }
    };
    

    

    return (
        <div className="edit-user-container">
            <h2>Edit User</h2>
            <div className="edit-user-form">
                {/* Display current profile image */}
                <div className="image-preview">
                    <img
                        src={imagePreview }
                        alt="Profile Preview"
                        className="profile-image"
                    />
                </div>
                <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    
                />
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Email"
                />
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default AdminEdit;
