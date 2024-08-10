import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import logo from '../images/logo.jpg';
import './index.css';

const LoginForm = ({ onToggleFormType }) => {
    const [formData, setFormData] = useState({
        user_email: '',
        user_password: '',
    });
    const [errors, setErrors] = useState({});
    const [Credentials, setCredentials] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateInputs = () => {
        let tempErrors = {};
        if (!formData.user_email) tempErrors.user_email = 'Email is required.';
        if (!formData.user_password) tempErrors.user_password = 'Password is required.';
        if (formData.user_password.length <= 6) {
            tempErrors.user_password = 'Password must be more than 6 characters.';
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
        try {
            const response = await fetch(
                'https://syoft.dev/Api/userlogin/api/userlogin',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_email: formData.user_email,
                        user_password: formData.user_password,
                    }),
                }
            );
                const userData = await response.json();
                console.log(userData);
            if (userData.status===true) {
                const userId = uuidv4();
                localStorage.setItem(userId, JSON.stringify({ ...userData }));
                navigate(`/dashboard/${userId}`);
            } else {
                console.error(userData.msg);
                setCredentials(true)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form className="form-container" onSubmit={handleLoginSubmit}>
            <img className='logo' src={logo} alt="company_logo"/>
            <h1 className="heading-info">Log In</h1>
            <p className="para-info">
                Don't have an account?{' '}
                <span className="page-navigate" onClick={onToggleFormType}>
                    Sign up
                </span>
            </p>
            <div className="form-group">
                <label htmlFor="user_email">Email*</label>
                <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    placeholder="Email"
                    value={formData.user_email}
                    onChange={handleChange}
                    className={errors.user_email ? 'input-error' : ''}
                    required
                />
                {errors.user_email && <p className="error-message">{errors.user_email}</p>}
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
                    className={errors.user_password ? 'input-error' : ''}
                    required
                />
                {errors.user_password && <p className="error-message">{errors.user_password}</p>}
            </div>
            <button type="submit" className="btn-submit">
                Log In
            </button>
            <p className='credentialsStatus'>{Credentials?"Invalid Credentials!":""}</p>
        </form>
    );
};

export default LoginForm;
