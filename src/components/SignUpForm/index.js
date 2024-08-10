import React, { useState } from 'react';
import logo from '../images/logo.jpg';
import './index.css';

function SignUpForm({ onToggleFormType, onSubmit }) {
    const [formData, setFormData] = useState({
        user_firstname: '',
        user_email: '',
        user_password: '',
        user_phone: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateInputs = () => {
        let tempErrors = {};
        if (!formData.user_firstname) tempErrors.user_firstname = 'First name is required.';
        if (!formData.user_email) tempErrors.user_email = 'Email is required.';
        if (!formData.user_password) tempErrors.user_password = 'Password is required.';
        else if (formData.user_password.length <= 6) tempErrors.user_password = 'Password must be more than 6 characters.';
        if (!formData.user_phone) tempErrors.user_phone = 'Phone number is required.';
        else if (!/^\d{10}$/.test(formData.user_phone)) tempErrors.user_phone = 'Phone number must be 10 digits.';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
        try {
            const response = await fetch(
                'https://syoft.dev/Api/user_registeration/api/user_registeration',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );
            if (response.ok) {
                console.log('User registered successfully');
                onToggleFormType(); 
            } else {
                console.error('Failed to register');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSignUpSubmit}>
            <img className='logo' src={logo} alt="company_logo"/>
            <h1 className="heading-info">Sign Up</h1>
            <p className="para-info">
                Already have an account?{' '}
                <span className="page-navigate" onClick={onToggleFormType}>Sign in</span>
            </p>
            <div className="form-group">
                <label htmlFor="user_firstname">First Name*</label>
                <input
                    type="text"
                    id="user_firstname"
                    name="user_firstname"
                    placeholder="First Name"
                    value={formData.user_firstname}
                    onChange={handleChange}
                    className={errors.user_firstname ? 'input-error' : ''}
                    required
                />
                {errors.user_firstname && <p className="error-message">{errors.user_firstname}</p>}
            </div>
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
            <div className="form-group">
                <label htmlFor="user_phone">Phone*</label>
                <input
                    type="text"
                    id="user_phone"
                    name="user_phone"
                    placeholder="Phone"
                    value={formData.user_phone}
                    onChange={handleChange}
                    className={errors.user_phone ? 'input-error' : ''}
                    required
                />
                {errors.user_phone && <p className="error-message">{errors.user_phone}</p>}
            </div>
            <button type="submit" className="btn-submit">Create your account</button>
        </form>
    );
}

export default SignUpForm;
