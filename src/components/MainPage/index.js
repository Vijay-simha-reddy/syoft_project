import React, { useState } from 'react';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import contentImage from '../images/contentImage.jpg';
import code1 from '../images/code-1.jpeg';
import code2 from '../images/code-2.jpeg';
import code3 from '../images/code-3.jpeg';
import code4 from '../images/code-4.jpeg';
import './index.css';

function MainPage() {
    const [formType, setFormType] = useState('signup');

    const toggleFormType = () => {
        setFormType((prevFormType) => (prevFormType === 'signup' ? 'login' : 'signup'));
    };

    return (
        <div className="form-section">
            <div className="form-content-container">
                <img className="image-container" src={contentImage} alt="content" />
                <div className="overlay">
                    <h1 className="content-main-heading">
                        Welcome to <br />
                        our community
                    </h1>
                    <p className="content-paragraph">
                        Fuse helps developers to build organized and well-coded dashboards full of beautiful and rich
                        modules. Join us and start building your application today.
                    </p>
                    <div className="bottom-content-section">
                        <div className="coders-images">
                            <img className="users-image coder1" src={code1} alt="coders" />
                            <img className="users-image coder2" src={code2} alt="coders" />
                            <img className="users-image coder3" src={code3} alt="coders" />
                            <img className="users-image coder4" src={code4} alt="coders" />
                        </div>
                        <p className="coders-info">More than 17k people joined us, it's your turn.</p>
                    </div>
                </div>
            </div>
            {formType === 'login' ? (
                <LoginForm onToggleFormType={toggleFormType} />
            ) : (
                <SignUpForm onToggleFormType={toggleFormType} />
            )}
        </div>
    );
}

export default MainPage;
