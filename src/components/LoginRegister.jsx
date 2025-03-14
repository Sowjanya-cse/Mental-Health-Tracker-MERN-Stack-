import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios directly
import styles from './LoginRegister.module.css';

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages
    const navigate = useNavigate(); // Initialize the navigation hook

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({ email: '', username: '', dateOfBirth: '', password: '', confirmPassword: '' });
        setErrorMessage(''); // Clear error message when toggling forms
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage(''); // Clear error message when input changes
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            if (isLogin) {
                // Login logic
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    username: formData.username,
                    password: formData.password
                });
                console.log(response.data);

                // Store the token and username in local storage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', formData.username); // Store the username

                navigate('/Dashboard'); // Navigate to the Dashboard page
            } else {
                // Registration logic
                const response = await axios.post('http://localhost:5000/api/auth/register', {
                    email: formData.email,
                    username: formData.username,
                    dateOfBirth: formData.dateOfBirth,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword
                });
                console.log(response.data);

                // Optionally, store the token and username after registration if you want to log the user in immediately
                localStorage.setItem('token', response.data.token); // Store the token after registration
                localStorage.setItem('username', formData.username); // Store the username

                navigate('/Dashboard'); // Navigate to the Dashboard page after successful registration
            }
        } catch (error) {
            // Set the error message from the response
            setErrorMessage(error.response ? error.response.data.message : 'An unexpected error occurred.');
            console.error('Error:', error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <div className={styles.loginRegisterContainer}>
            <div className={styles.formContainer}>
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className={styles.formGroup}>
                                <label>Email:</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Date of Birth:</label>
                                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
                            </div>
                        </>
                    )}
                    <div className={styles.formGroup}>
                        <label>Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                    </div>
                    {!isLogin && (
                        <div className={styles.formGroup}>
                            <label>Confirm Password:</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
                        </div>
                    )}
                    <button type="submit" className={styles.submitBtn}>
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>} {/* Display error message */}
                <p>
                    {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
                    <span onClick={toggleForm} className={styles.toggleFormLink}>
                        {isLogin ? ' Register' : ' Login'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginRegister;