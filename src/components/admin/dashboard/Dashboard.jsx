import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Ensure this CSS file has necessary styling
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '../../../redux/AdminSlice';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        // Fetch all users from the backend
        axios.get('http://localhost:3000/admin/data', { withCredentials: true })
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching users:', error);
            });
    }, []);

    // Function to handle delete user
    const handleDelete = (userId) => {
        console.log("Deleting user with ID:", userId);
        axios.delete(`http://localhost:3000/admin/delete/${userId}`, { withCredentials: true })
            .then(() => {
                alert('User deleted successfully');
                setUsers(users.filter(user => user._id !== userId)); // Update the UI after deletion
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };

    // Function to handle editing user
    const handleEdit = (userId) => {
        navigate(`/adminedit/${userId}`); // Navigate to the edit page
    };
    const handleAddUser = () => {
        navigate('/adminadd'); // Assuming the route for adding a user is '/adduser'
    };
    const handleLogout = async () => {
       await axios.post("http://localhost:3000/admin/logout", {}, { withCredentials: true });
    dispatch(logoutAdmin());
    navigate("/admin");
    };
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">User Dashboard</h2>
            <div className="dashboard-controls">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-box"
                />
                
            </div>
            <div className="button-group">
    <button onClick={handleAddUser} className="add-user-btn">Add User</button>
    <button onClick={handleLogout} className="logout-btn">Logout</button>
</div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Profile Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {filteredUsers.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <img
                                    src={user.profileImage ? `http://localhost:3000${user.profileImage}` : '/default-profile-image.png'}
                                    alt={user.name}
                                    className="user-avatar"
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user._id)} className="edit-btn">Edit</button>
                                <button onClick={() => handleDelete(user._id)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
