import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import logo from '../images/logo.jpg'; 
import contentImage from '../images/content-image.png';
import code1 from '../images/code-1.jpeg';
import code2 from '../images/code-2.jpeg';
import code3 from '../images/code-3.jpeg';
import code4 from '../images/code-4.jpeg';
import "./index.css";

function SignUp() {
    const [formType, setFormType] = useState('signup'); 
    const [formData, setFormData] = useState({
        user_firstname: '',
        user_email: '',
        user_password: '',
        user_phone: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateInputs = () => {
        if (!formData.user_email || !formData.user_password || (formType === 'signup' && (!formData.user_firstname || !formData.user_phone))) {
            setError('All fields are required.');
            return false;
        }
        if (formType === 'signup' && !/^\d{10}$/.test(formData.user_phone)) {
            setError('Phone number must be 10 digits.');
            return false;
        }
        if (formData.user_password.length <= 6) {
            setError('Password must be more than 6 characters.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) {
            return;
        }

        if (formType === 'signup') {
            const payload = {
                ...formData,
                user_lastname: 'Doe',
                user_city: 'Hyderabad',
                user_zipcode: '500072'
            };

            try {
                const response = await fetch('https://syoft.dev/Api/user_registeration/api/user_registeration', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    console.log('User registered successfully');
                    setFormType('login');
                } else {
                    console.error('Failed to register');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else if (formType === 'login') {
            try {
                const response = await fetch('https://syoft.dev/Api/userlogin/api/userlogin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_email: formData.user_email,
                        user_password: formData.user_password,
                    })
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log(userData)
                    const userId= uuidv4()
                    localStorage.setItem(userId, JSON.stringify({ ...userData}));
                    navigate(`/dashboard/${userId}`);
                } else {
                    console.error('Failed to log in');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className='form-section'>
            <div className='form-content-container'>
                <img className='image-container' src={contentImage} alt="content-image" />
                <div className='overlay'>
                    <h1 className='conten-main-heading'>Welcome to our community</h1>
                    <p className='content-paragraph'>Fuse helps developers to build organized and well coded dashboards full of beautiful and rich modules. Join us and start building your application today.</p>
                    <div className='bottom-content-section'>
                        <div className='coders-images'>
                            <img className="users-image coder1" src={code1} alt="coders_image" />
                            <img className="users-image coder2" src={code2} alt="coders_image" />
                            <img className="users-image coder3" src={code3} alt="coders_image" />
                            <img className="users-image coder4" src={code4} alt="coders_image" />
                        </div>
                        <p className='coders-info'>More than 17k people joined us, it's your turn.</p>
                    </div>
                </div>
            </div>
            <form className="form-container" onSubmit={handleSubmit}>
                <img className='logo' src={logo} alt="website-logo" />
                <h1 className='heading-info'>{formType === 'signup' ? 'Sign Up' : 'Log In'}</h1>
                <p className='para-info'>
                    {formType === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                    <a href="#" onClick={() => setFormType(formType === 'signup' ? 'login' : 'signup')}>
                        {formType === 'signup' ? 'Sign in' : 'Sign up'}
                    </a>
                </p>
                {error && <p className="error-message">{error}</p>}
                {formType === 'signup' && (
                    <div className="form-group">
                        <label htmlFor="user_firstname">First Name*</label>
                        <input
                            type="text"
                            id="user_firstname"
                            name="user_firstname"
                            placeholder="First Name"
                            value={formData.user_firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="user_email">Email*</label>
                    <input
                        type="email"
                        id="user_email"
                        name="user_email"
                        placeholder="Email"
                        value={formData.user_email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="user_password">Password*</label>
                    <input
                        type="password"
                        id="user_password"
                        name="user_password"
                        placeholder="Password"
                        value={formData.user_password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {formType === 'signup' && (
                    <div className="form-group">
                        <label htmlFor="user_phone">Phone*</label>
                        <input
                            type="text"
                            id="user_phone"
                            name="user_phone"
                            placeholder="Phone"
                            value={formData.user_phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <button type="submit" className='btn-submit'>
                    {formType === 'signup' ? 'Create your account' : 'Log In'}
                </button>
            </form>
        </div>
    );
}

export default SignUp;
