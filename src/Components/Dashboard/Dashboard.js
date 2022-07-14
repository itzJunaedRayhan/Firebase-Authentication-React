import React, { useState } from 'react';
import "./Dashboard.css"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const {currentUser, logout, userInfo} = useAuth();

    const handleLogout = async () => {
        setError("");
        try {
          await logout().then(() => {
            navigate("/login");
          });
        } catch (error) {
          setError(error);
        }
    };

    return (
        <div className="wrapper">
			<div className="inner">
				<div className="profile">
                    <h3>Profile</h3>
                    {error ? (
                        <p className="danger">{JSON.stringify(error)}</p>
                    ) : (
                        ""
                    )}
                    <div>
                        <h4>{userInfo.firstName ? `First Name : ${userInfo.firstName}` : null}</h4>
                        <h4>{userInfo.lastName ? `Last Name : ${userInfo.lastName}` : null}</h4>
                        <h4>{userInfo.userName ? `UserName : ${userInfo.userName}` : null}</h4>
                        <h4>{currentUser.email || userInfo.email ? `Email : ${currentUser.email}` : null}</h4>
                        <h4>{userInfo.phone ? `Phone : ${userInfo.phone}` : null}</h4>
                        <h4>{userInfo.password ? `Password : ${userInfo.password}` : null}</h4>
                        <h4>{currentUser.password ? `Password : ${currentUser.password}` : null}</h4>
                    </div>
                    <div className='btn-group'>
                        <button type="submit" onClick={handleLogout} className="submitBtn" style={{marginRight: '15px'}}>Log Out</button>
                        <button type="submit" onClick={() => navigate("/update")} className="submitBtn">Update</button>
                    </div>
				</div>
			</div>
		</div>
    );
};

export default Dashboard;