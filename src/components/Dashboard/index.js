import React, { useState } from 'react';
import './index.css';
import code1 from '../images/code-2.jpeg';
import logo from '../images/logo.jpg'
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faProjectDiagram, faChartBar, faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Dashboard() {
    const [selectedSection, setSelectedSection] = useState('profile');
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

    const renderContent = () => {
        switch (selectedSection) {
            case 'profile':
                return (
                    <div className='dashboard-container'>
                        <div className='dashboard-section'>
                            <div className='profile-section'>
                                <img className="profile" src={code1} alt="profile" />
                                <h4 className='username'>{userData.user_firstname + " " + userData.user_lastname}</h4>
                                <div className='connect-section'>
                                    <div className="connect-item">
                                        <FontAwesomeIcon className='item-icon' icon={faGithub} />
                                    </div>
                                    <div className="connect-item">
                                        <FontAwesomeIcon className='item-icon' icon={faLinkedin} />
                                    </div>
                                    <div className="connect-item">
                                        <FontAwesomeIcon className='item-icon' icon={faEnvelope} />
                                    </div>
                                </div>
                            </div>
                            <div className='right-section'>
                                <div className='information-section'>
                                    <h2 className='info-heading'>Information</h2>
                                    <hr />
                                    <div className='info-details'>
                                        <div className='info-item'>
                                            <h4>Email</h4>
                                            <p className='info-data'>{userData.user_email}</p>
                                        </div>
                                        <div className='info-item'>
                                            <h4>Phone Number</h4>
                                            <p className='info-data'>{userData.user_phone}</p>
                                        </div>
                                        <div className='info-item'>
                                            <h4>Location</h4>
                                            <p className='info-data'>{userData.user_city}</p>
                                        </div>
                                        <div className='info-item'>
                                            <h4>Zipcode</h4>
                                            <p className='info-data'>{userData.user_zipcode}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='project-information-section'>
                                    <h2 className='info-heading'>Projects Recently</h2>
                                    <hr />
                                    <div className='info-details'>
                                        <div className='info-item'>
                                            <h4>Project Name</h4>
                                            <p className='info-data'>Password Manager App</p>
                                        </div>
                                        <div className='info-item'>
                                            <h4>Post Viewed</h4>
                                            <p className='info-data'>Rohan Kalyi</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div className='content'>
                        <h1>Projects</h1>
                        <hr />
                        <table className="projects-table">
                            <thead>
                                <tr className='table-headings'>
                                    <th>Project Name</th>
                                    <th>Technologies</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='data-rows'>
                                    <td>Portfolio</td>
                                    <td>React, Node.js</td>
                                    <td><button className="view-button">View</button></td>
                                </tr>
                                <tr className='data-rows'>
                                    <td>Ecommerce Website</td>
                                    <td>Vue, Express</td>
                                    <td><button className="view-button">View</button></td>
                                </tr>
                                <tr className='data-rows'>
                                    <td>Password Manager</td>
                                    <td>Angular, MongoDB</td>
                                    <td><button className="view-button">View</button></td>
                                </tr>
                                <tr className='data-rows'>
                                    <td>Portfolio</td>
                                    <td>React, Node.js</td>
                                    <td><button className="view-button">View</button></td>
                                </tr>
                                <tr className='data-rows'>
                                    <td>Ecommerce Website</td>
                                    <td>Vue, Express</td>
                                    <td><button className="view-button">View</button></td>
                                </tr>
                                <tr className='data-rows'>
                                    <td>Password Manager</td>
                                    <td>Angular, MongoDB</td>
                                    <td><button className="view-button">View</button></td>
                                </tr>
                                <tr className='data-rows'>
                                    <td>Portfolio</td>
                                    <td>React, Node.js</td>
                                    <td><button className="view-button">View</button></td>
                                </tr>
                                <tr className='data-rows'>
                                    <td>Ecommerce Website</td>
                                    <td>Vue, Express</td>
                                    <td><button className="view-button">View</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            case 'skills':
                return (
                    <div className='content'>
                        <h1>Skills</h1>
                        <hr/>
                        <div className='skills-container'>
                            {['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Node.js', 'React.js', 'SQL', 'Python'].map((skill, index) => (
                                <div key={index} className={`skill-card skill-${index}`}>
                                    <h3>{skill}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className='dash-logo-heading'>
                    <img className="dash-logo" src={logo} alt="company-logo"/>
                    <h3 className='dashboard-heading'>DASHBOARD</h3>
                </div>
                <div className={`sidebar-item ${selectedSection === 'profile' ? 'active' : ''}`} onClick={() => setSelectedSection('profile')}>
                    <FontAwesomeIcon className='item-icon' icon={faUser} /> <span className='none-name'>Profile</span>
                </div>
                <div className={`sidebar-item ${selectedSection === 'projects' ? 'active' : ''}`} onClick={() => setSelectedSection('projects')}>
                    <FontAwesomeIcon className='item-icon' icon={faProjectDiagram} /> <span className='none-name'>Projects</span>
                </div>
                <div className={`sidebar-item ${selectedSection === 'skills' ? 'active' : ''}`} onClick={() => setSelectedSection('skills')}>
                    <FontAwesomeIcon className='item-icon' icon={faChartBar} /> <span className='none-name'>Skills</span>
                </div>
                <div className="sidebar-item" onClick={handleLogout}>
                    <FontAwesomeIcon className='item-icon' icon={faSignOutAlt} /> <span className='none-name'>Logout</span>
                </div>
            </div>
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default Dashboard;
