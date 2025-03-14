import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './MoodCheck.module.css';
import axios from 'axios';

const MoodCheck = () => {
    const [moodLevel, setMoodLevel] = useState(0);
    const [selectedAreas, setSelectedAreas] = useState([]);
    const [solutions, setSolutions] = useState([]);
    const [showSolutions, setShowSolutions] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [username, setUsername] = useState(''); // Assuming you'll get this dynamically

    const areas = [
        'Personal', 'Professional', 'Relationship', 'Friendship',
        'Family', 'Work', 'Health', 'Leisure', 'Fitness',
        'Education', 'Finance', 'Travel', 'Social Life',
        'Hobbies', 'Self-Care', 'Mental Health'
    ];

    // Fetch the username from wherever you're storing it, e.g., local storage or context
    useEffect(() => {
        const storedUsername = localStorage.getItem('username'); // Example of retrieving username
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleAreaSelection = (area) => {
        setSelectedAreas(prev =>
            prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
        );
    };

    const handleSubmit = async () => {
        if (moodLevel < 5) {
            setShowAlert(true);
        }
        const generatedSolutions = getSolutions(selectedAreas, moodLevel);
        setSolutions(generatedSolutions);
        setShowSolutions(true);

        // Prepare the data to send to the API
        const data = {
            username,        // Use the dynamic username here
            moodRating: moodLevel,
            upsetAreas: selectedAreas
        };

        try {
            const response = await axios.post('http://localhost:5000/api/moodCheck', data);
            console.log(response.data); // Handle response as needed
        } catch (error) {
            console.error('Error saving mood check data', error);
        }
    };

    const getSolutions = (areas, moodLevel) => {
        const suggestions = [];
        if (moodLevel < 3) {
            suggestions.push("Consider taking a break and relaxing.");
            if (areas.includes('Health')) suggestions.push("Focus on self-care with a warm bath or meditation.");
            if (areas.includes('Work')) suggestions.push("Identify tasks to delegate if possible.");
            if (areas.includes('Family')) suggestions.push("Connect with family over a meal.");
            suggestions.push("Try calming music or nature sounds.");
        } else if (moodLevel < 5) {
            suggestions.push("Engage in light activity, like a walk.");
            if (areas.includes('Friendship')) suggestions.push("Chat with a friend or watch a movie.");
            if (areas.includes('Personal')) suggestions.push("Set small goals, like tidying a room.");
            suggestions.push("Try cooking a new recipe.");
        } else if (moodLevel < 7) {
            suggestions.push("Consider journaling to reflect.");
            if (areas.includes('Work')) suggestions.push("Prioritize tasks and take breaks.");
            suggestions.push("Explore creative outlets like writing.");
        } else if (moodLevel < 9) {
            suggestions.push("Keep up the positive mindset!");
            if (areas.includes('Leisure')) suggestions.push("Plan a weekend activity with friends.");
            suggestions.push("Create a vision board.");
        } else {
            suggestions.push("You're in a great place! Spread your positivity.");
            if (areas.includes('Friendship')) suggestions.push("Plan a get-together.");
            suggestions.push("Start a gratitude journal.");
        }
        return suggestions;
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.moodSection}>
                    <label htmlFor="moodSlider">Overall Mood Today:</label>
                    <input
                        type="range"
                        id="moodSlider"
                        min="1"
                        max="10"
                        value={moodLevel}
                        onChange={(e) => setMoodLevel(Number(e.target.value))}
                        className={styles.slider}
                    />
                    <span>{moodLevel}</span>
                </div>

                <div className={styles.selectionSection}>
                    <h2>Which area are you feeling upset?</h2>
                    <div className={styles.buttonsContainer}>
                        {areas.map(area => (
                            <button
                                key={area}
                                onClick={() => handleAreaSelection(area)}
                                className={`${styles.areaButton} ${selectedAreas.includes(area) ? styles.selected : ''}`}
                            >
                                {area}
                            </button>
                        ))}
                    </div><br />
                    <button className={styles.submitButton} onClick={handleSubmit}>
                        Submit
                    </button>
                </div>

                {showAlert && (
                    <div className={styles.alertPopup}>
                        <div className={styles.alertContent}>
                            <h2>Low Mood Alert</h2>
                            <p>Your mood seems low today. Consider reaching out to a friend or practicing some self-care.</p>
                            <button onClick={() => setShowAlert(false)} className={styles.closeAlertButton}>Close</button>
                        </div>
                    </div>
                )}

                {showSolutions && (
                    <div className={styles.solutionsSection}>
                        <h2>Based on your input, here are some solutions:</h2>
                        <ul>
                            {solutions.map((solution, index) => (
                                <li key={index}>{solution}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoodCheck;
