import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Sidebar from '../Sidebar/Sidebar'; // Assuming Sidebar is a separate component
import styles from './MoodReports.module.css'; // Import the CSS module

const MoodReports = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Function to update the month and year automatically
    const formatMonthYear = (date) => {
        return new Intl.DateTimeFormat('en-IN', { 
            year: 'numeric', 
            month: 'long', 
            timeZone: 'Asia/Kolkata' 
        }).format(date);
    };

    // Function to go to the previous month
    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() - 1);
            return newDate;
        });
    };

    // Function to go to the next month
    const handleNextMonth = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + 1);
            return newDate;
        });
    };

    // Sample dynamic data for the bar graphs (adjust based on actual data)
    const moodData = {
        irritability: [1.5, 2.5, 1, 3, 2.5, 1.7, 2, 2.8, 3, 1.5, 2],
        anxiety: [2, 1.5, 3, 2.8, 1.5, 2, 2.5, 1, 3, 2, 1.8],
        psychoticSymptoms: [0.5, 1, 1.5, 2, 1.8, 1.2, 0.8, 0.7, 1, 1.1, 0.9],
        talkTherapy: [3, 2.5, 2, 1.5, 1.8, 2.2, 3, 2.8, 2.5, 1.7, 2],
        appetite: [2.5, 1.8, 2, 3, 2.2, 2.4, 2.1, 2.7, 2.5, 1.9, 2],
        socialInteraction: [1.5, 2, 2.5, 2.8, 2.3, 2.1, 2, 3, 1.5, 2.5, 2.1],
    };

    // Utility function to generate chart data based on the mood type
    const getChartData = (moodType) => {
        return {
            labels: ['Day 1', 'Day 4', 'Day 7', 'Day 10', 'Day 13', 'Day 16', 'Day 19', 'Day 22', 'Day 25', 'Day 28', 'Day 31'],
            datasets: [
                {
                    label: `${moodType} Data`,
                    data: moodData[moodType],
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                },
            ],
        };
    };

    return (
        <div className={styles.reportsContainer}>
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Main content on the right */}
            <div className={styles.reportsContent}>
                {/* Navigation bar */}
                <div className={styles.navigationBar}>
                    <button onClick={handlePreviousMonth}>Previous</button>
                    <h2>{formatMonthYear(currentDate)}</h2>
                    <button 
                        onClick={handleNextMonth} 
                        disabled={new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear()}
                    >
                        Next
                    </button>
                </div>

                {/* Bar graph grid */}
                <h2>Mood Indicators for {formatMonthYear(currentDate)}</h2>
                <div className={styles.histogramGrid}>
                    {['irritability', 'anxiety', 'psychoticSymptoms', 'talkTherapy', 'appetite', 'socialInteraction'].map(mood => (
                        <div className={styles.histogramItem} key={mood}>
                            <Bar data={getChartData(mood)} />
                            <h2>{mood.charAt(0).toUpperCase() + mood.slice(1).replace(/([A-Z])/g, ' $1')}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MoodReports;
