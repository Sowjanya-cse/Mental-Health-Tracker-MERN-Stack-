// src/Components/Sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css'; // Ensure this import is correct

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform any logout logic here, like clearing user data, tokens, etc.
        navigate('/'); // Redirect to HomePage
    };

    return (
        <div className={styles.sidebar}>
            <h1 className={styles.sidebarTitle}>MTracker</h1>
            <nav className={styles.sidebarNav}>
                <ul>
                    <li>
                        <Link to="/Dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/LogMoods">Log Moods</Link>
                    </li>
                    <li>
                        <Link to="/MoodReports">Mood Reports</Link>
                    </li>
                    <li>
                        <Link to="/MoodCheck">Mood Check</Link>
                    </li>
                    <li>
                        <Link to="/Resource">Resource</Link>
                    </li>
                    <li>
                        <Link to="/Settings">Settings</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
