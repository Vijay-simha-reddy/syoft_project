import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import code1 from '../images/code-2.jpeg';
import './index.css'

function Dashboard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem(id));

    if (!user || !user.user_data || user.user_data.length === 0) {
        return navigate('/');
    }

    const userData = user.user_data[0];

    const handleLogout = () => {
        localStorage.removeItem(id);
        navigate('/');
    };

    return (
        <div className='dashboard-container'>
        <div className='dashboard-section'>
            <div className='profile-section'>
                <img className="profile" src={code1} alt="profile"/>
                <h2 className='username'>{userData.user_firstname+" "+userData.user_lastname}</h2>
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>
            <div className='right-section'>
            <div className='information-section'>
                <h2 className='info-heading'>Information</h2>
                <hr/>
                <div className='email-phone-section'>
                    <div className='email-section'>
                        <h4>Email</h4>
                        <p className='info-data'>{userData.user_email}</p>
                    </div>
                    <div className='phone-section'>
                        <h4>Phone Number</h4>
                        <p className='info-data'>{userData.user_phone}</p>
                    </div>
                    <div className='phone-section'>
                        <h4>loaction</h4>
                        <p className='info-data'>{userData.user_city}</p>
                    </div>
                    <div className='phone-section'>
                        <h4>Zipcode</h4>
                        <p className='info-data'>{userData.user_zipcode}</p>
                    </div>
                </div>
            </div>

            <div className='project-information-section'>
                <h2 className='info-heading'>Projects</h2>
                <hr/>
                <div className='email-phone-section'>
                    <div className='email-section'>
                        <h4>Project Name</h4>
                        <p className='info-data'>Password Manager App</p>
                    </div>   
                    <div className='email-section'>
                        <h4>Post Viewed</h4>
                        <p className='info-data'>Rohan Kalyi</p>
                    </div>  
                </div>
            </div>
            
        </div>
        </div>
        </div>
    );
}

export default Dashboard;
