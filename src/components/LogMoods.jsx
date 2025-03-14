import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar'; // Ensure you have your Sidebar component imported
import styles from './LogMoods.module.css'; // Importing CSS module
import axios from 'axios'; // Import axios for making requests

const LogMoods = ({ onLogDataUpdate }) => {
    // State declarations
    const [hoursSlept, setHoursSlept] = useState(1);
    const [depressedMood, setDepressedMood] = useState(0);
    const [elevatedMood, setElevatedMood] = useState(0);
    const [irritability, setIrritability] = useState(0);
    const [anxiety, setAnxiety] = useState(0);
    const [appetite, setAppetite] = useState(0);
    const [socialinteraction, setSocialinteraction] = useState(0);
    const [psychoticSymptoms, setPsychoticSymptoms] = useState(0);
    const [talkTherapy, setTalkTherapy] = useState(0);
    const [happiness, setHappiness] = useState(0);
    const [sadness, setSadness] = useState(0);
    const [anger, setAnger] = useState(0);
    const [anxietyRate, setAnxietyRate] = useState(0);
    const [excitement, setExcitement] = useState(0);
    const [note, setNote] = useState('');
    const [showNoteInput, setShowNoteInput] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [logDate, setLogDate] = useState(new Date());

    // Format the date for display
    const formatDate = (date) => {
        return date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    const handlePrevious = () => {
        setLogDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    };

    const handleNext = () => {
        const currentDate = new Date();
        if (logDate.toLocaleDateString() !== currentDate.toLocaleDateString()) {
            setLogDate((prevDate) => {
                const newDate = new Date(prevDate);
                newDate.setDate(newDate.getDate() + 1);
                return newDate;
            });
        }
    };

    const handleAddNote = () => {
        setShowNoteInput(!showNoteInput);
    };

    // Handle mood change dynamically using a setter mapping
    const handleMoodChange = (mood, value) => {
        const moodSetters = {
            depressedMood: setDepressedMood,
            elevatedMood: setElevatedMood,
            irritability: setIrritability,
            anxiety: setAnxiety,
            appetite: setAppetite,
            socialinteraction: setSocialinteraction,
            psychoticSymptoms: setPsychoticSymptoms,
            talkTherapy: setTalkTherapy
        };

        if (moodSetters[mood]) {
            moodSetters[mood](value);
        }
    };

    const handleSubmit = async () => {
        const submittedData = {
            username: localStorage.getItem('username'), // Retrieve username from localStorage
            hoursSlept,
            depressedMood,
            elevatedMood,
            irritability,
            anxiety,
            appetite,
            socialinteraction,
            psychoticSymptoms,
            talkTherapy,
            happiness,
            sadness,
            anger,
            anxietyRate,
            excitement,
            note,
            logDate
        };

        console.log("Submitted Data:", submittedData);
        setIsSubmitted(true);

        try {
            // Make a POST request to your backend API to save the data
            const response = await axios.post('http://localhost:5000/api/moods/log', submittedData);
            console.log(response.data);

            if (typeof onLogDataUpdate === 'function') {
                onLogDataUpdate(submittedData);
            }
        } catch (error) {
            console.error('Error logging mood data:', error);
        }

        resetFields();
    };

    const resetFields = () => {
        setHoursSlept(1);
        setDepressedMood(0);
        setElevatedMood(0);
        setIrritability(0);
        setAnxiety(0);
        setAppetite(0);
        setSocialinteraction(0);
        setPsychoticSymptoms(0);
        setTalkTherapy(0);
        setHappiness(0);
        setSadness(0);
        setAnger(0);
        setAnxietyRate(0);
        setExcitement(0);
        setNote('');
        setShowNoteInput(false);
    };

    // Slider labels mapping
    const moodLabels = ["NONE", "MILD", "MODERATE", "SEVERE"];

    // Access state values dynamically using a mapping
    const moodValues = {
        depressedMood,
        elevatedMood,
        irritability,
        anxiety,
        appetite,
        socialinteraction,
        psychoticSymptoms,
        talkTherapy
    };

    return (
        <div className={styles.container}>
            <Sidebar /> {/* Include Sidebar */}
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <button className={styles.navButton} onClick={handlePrevious} disabled={isSubmitted}>Previous</button>
                    <h2>{formatDate(logDate)}</h2>
                    <button className={styles.navButton} onClick={handleNext} disabled={isSubmitted || logDate.toLocaleDateString() === new Date().toLocaleDateString()}>Next</button>
                </div>

                <div className={styles.trackingPanel}>
                    <div className={styles.moodBox}>
                        <label>Hours Slept</label>
                        <input
                            type="range"
                            min="1"
                            max="12"
                            value={hoursSlept}
                            onChange={(e) => !isSubmitted && setHoursSlept(e.target.value)}
                            className={styles.slider}
                            disabled={isSubmitted} // Disable if submitted
                        />
                        <span>{hoursSlept} hour(s)</span>
                    </div>

                    {["depressedMood", "elevatedMood", "irritability", "anxiety", "appetite", "socialinteraction", "psychoticSymptoms", "talkTherapy"].map((mood) => (
                        <div className={styles.moodBox} key={mood}>
                            <label>{mood.charAt(0).toUpperCase() + mood.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                            <input
                                type="range"
                                min="0"
                                max="3"
                                value={moodValues[mood]} // Access the mood value dynamically
                                onChange={(e) => !isSubmitted && handleMoodChange(mood, e.target.value)}
                                className={styles.slider}
                                disabled={isSubmitted} // Disable if submitted
                            />
                            <span>{moodLabels[moodValues[mood]]}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.noteSection}>
                    <label>Today's Note:</label>
                    {showNoteInput && (
                        <textarea value={note} onChange={(e) => !isSubmitted && setNote(e.target.value)} disabled={isSubmitted} />
                    )}<br />
                    <button className={styles.saveButton} onClick={showNoteInput ? handleSubmit : handleAddNote} disabled={isSubmitted}>
                        {showNoteInput ? "Save Note" : "Add Note"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogMoods;