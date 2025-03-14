// frontend/src/pages/Dashboard/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css'; // Updated to use CSS Modules
import { FaClipboard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Sidebar from '../Sidebar/Sidebar'; // Import the Sidebar component
import axios from 'axios'; // Import axios for API calls

const Dashboard = () => {
    const [currentDate] = useState(new Date()); // Keeping currentDate as state, but not modifying it
    const [sleepData, setSleepData] = useState([]); // Used for sleep data
    const [reminders, setReminders] = useState([]); // State for storing reminders data
    const [showReminderPopup, setShowReminderPopup] = useState(false); // State for the reminder popup

    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem('username'); // Retrieve the username from localStorage

        // Check if today's reminder popup has been dismissed
        const checkDismissedPopup = () => {
            const dismissedDate = localStorage.getItem('dismissedReminderPopupDate');
            const today = currentDate.toISOString().split('T')[0];
            return dismissedDate === today;
        };

        // Fetch reminders for the logged-in user from the backend
        const fetchReminders = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/reminders/${username}`);
                const todayReminders = response.data.filter(reminder => {
                    const today = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
                    const startingDate = new Date(reminder.startingDate);
                    const lastDate = new Date(reminder.lastDate);

                    return (
                        currentDate >= startingDate &&
                        currentDate <= lastDate &&
                        reminder.days.includes(today)
                    );
                });
                setReminders(todayReminders);
                if (todayReminders.length > 0 && !checkDismissedPopup()) {
                    setShowReminderPopup(true); // Show popup if there are reminders and it hasn't been dismissed
                }
            } catch (error) {
                console.error('Error fetching reminders:', error);
            }
        };

        // Sample sleep data (replace with real data)
        const mockSleepData = [6, 7, 5, 8, 6, 5, 7]; // hours of sleep per day
        setSleepData(mockSleepData);

        fetchReminders(); // Fetch reminders when component mounts
    }, [currentDate]);

    const handleIconClick = () => {
        navigate('/LogMoods');
    };

    // Function to handle closing the reminder popup
    const handleClosePopup = () => {
        setShowReminderPopup(false);
        const today = currentDate.toISOString().split('T')[0];
        localStorage.setItem('dismissedReminderPopupDate', today); // Store today's date in localStorage
    };

    // Data for the sleep bar chart (histogram)
    const sleepChartData = {
        labels: Array.from({ length: sleepData.length }, (_, i) => i + 1), // 1 to number of days
        datasets: [
            {
                label: 'Hours of Sleep',
                data: sleepData,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const sleepChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                max: 12,
            },
        },
    };

    // Sample mood data for the week (values representing none, mild, moderate, severe)
    const sampleMoodData = [
        { day: 'Mon', depressedMood: 'mild', elevatedMood: 'none' },
        { day: 'Tue', depressedMood: 'moderate', elevatedMood: 'mild' },
        { day: 'Wed', depressedMood: 'none', elevatedMood: 'moderate' },
        { day: 'Thu', depressedMood: 'severe', elevatedMood: 'none' },
        { day: 'Fri', depressedMood: 'mild', elevatedMood: 'severe' },
        { day: 'Sat', depressedMood: 'moderate', elevatedMood: 'mild' },
        { day: 'Sun', depressedMood: 'none', elevatedMood: 'none' },
    ];

    const moodDataForChart = {
        depressedMood: [],
        elevatedMood: [],
    };

    sampleMoodData.forEach((entry) => {
        moodDataForChart.depressedMood.push(
            entry.depressedMood === 'none' ? 0 : entry.depressedMood === 'mild' ? 1 : entry.depressedMood === 'moderate' ? 2 : 3
        );
        moodDataForChart.elevatedMood.push(
            entry.elevatedMood === 'none' ? 0 : entry.elevatedMood === 'mild' ? 1 : entry.elevatedMood === 'moderate' ? 2 : 3
        );
    });

    // Data for the mood bar chart
    const moodChartData = {
        labels: sampleMoodData.map((entry) => entry.day), // Use the days of the week
        datasets: [
            {
                label: 'Depressed Moods',
                data: moodDataForChart.depressedMood,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Elevated Moods',
                data: moodDataForChart.elevatedMood,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const moodChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
            },
        },
    };

    const formattedDate = currentDate.toLocaleDateString('en-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
        <div className={styles.dashboard}>
            <Sidebar /> {/* Include the Sidebar component here */}
            <div className={styles.dashboardContent}>
                <h2 className={styles.currentDate}>{formattedDate}</h2> {/* Current Date Display */}
                
                {/* Reminder Popup (only shows if reminders exist for today) */}
                {showReminderPopup && (
                    <div className={styles.popup}>
                        <div className={styles.popupContent}>
                            <h3>Reminders for Today</h3>
                            {reminders.length > 0 && reminders.map((reminder, index) => (
                                <p key={index}>{reminder.description}</p>
                            ))}
                            <button className={styles.closeButton} onClick={handleClosePopup}>Close</button>
                        </div>
                    </div>
                )}

                <div className={styles.moodLog}>
                    <div className={styles.moodLogText}>
                        <h3>Did You Log Your Moods Today?</h3>
                        <p>You haven't logged your moods yet.</p>
                        <div className={styles.moodLogIcon} onClick={handleIconClick}>
                            <FaClipboard size={80} />
                        </div>    
                    </div>
                </div>

                <div className={styles.chartsContainer}>
                    <div className={styles.chartBox}>
                        <h4>Depressed and Elevated Moods: This Week</h4>
                        <div className={styles.chartContainer}>
                            <Bar data={moodChartData} options={moodChartOptions} />
                        </div>
                    </div>

                    <div className={styles.chartBox}>
                        <h4>Hours of Sleep Per Day: {currentDate.toLocaleString('default', { month: 'long' })}</h4>
                        <div className={styles.chartContainer}>
                            <Bar data={sleepChartData} options={sleepChartOptions} />
                        </div>
                        <p className={styles.averageSleep}>Average sleep per night: <b>{(sleepData.reduce((a, b) => a + b, 0) / sleepData.length).toFixed(1)} HOURS</b></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
