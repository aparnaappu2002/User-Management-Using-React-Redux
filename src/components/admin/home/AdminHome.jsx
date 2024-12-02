import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAdmin } from "../../../redux/AdminSlice"; // Adjust the path according to your project structure
import { useNavigate } from "react-router-dom";
import "./AdminHome.css"; // Import the CSS file

const AdminHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Access admin data from Redux state
    const admin = useSelector((state) => state.admin?.admin);

    // Function to handle logout
    const handleLogout = () => {
        dispatch(logoutAdmin());
        navigate("/adminlogin"); // Redirect to login after logout
    };

    // Function to navigate to the dashboard
    const goToDashboard = () => {
        navigate("/dashboard");
    };

    // If admin data is not available, show a message (optional)
    if (!admin) {
        return <div className="admin-home">Admin not logged in</div>;
    }
    console.log(admin.profileImage)

    return (
        <div className="admin-home">
            <div className="admin-card">
                <img
                    src={admin.profileImage ? `http://localhost:3000${admin.profileImage}` : '/default.png'}
                    alt="Admin Profile"
                    className="admin-avatar"
                />
                <h2>{admin.email}</h2>
                <h2>{admin.name}</h2>
                <div className="admin-buttons">
                    <button onClick={goToDashboard} className="dashboard-btn">Dashboard</button>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
