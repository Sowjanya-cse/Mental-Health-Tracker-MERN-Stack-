import React, { useState, useEffect } from 'react'; 
import Sidebar from '../Sidebar/Sidebar';
import styles from './Settings.module.css';
import axios from 'axios';

const Settings = () => {
    const [medicationVisible, setMedicationVisible] = useState(false);
    const [reminderVisible, setReminderVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showPopupMessage, setShowPopupMessage] = useState(false);
    const [visibleMedications, setVisibleMedications] = useState([]); // State for visible medications

    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const saveMedication = async () => {
        const medicationData = {
            username: localStorage.getItem('username'),
            name: document.querySelector('input[name="medicationName"]').value,
            dosage: document.querySelector('input[name="dosage"]').value,
            units: document.querySelector('select[name="units"]').value,
            timeOfDay: document.querySelector('select[name="timeOfDay"]').value,
            visible: document.querySelector('input[name="visible"]').checked
        };

        try {
            await axios.post('http://localhost:5000/api/medications', medicationData);
            setMedicationVisible(false);
            setShowPopupMessage(true);
            setTimeout(() => setShowPopupMessage(false), 3000);
            fetchVisibleMedications(); // Fetch updated list of visible medications
        } catch (error) {
            console.error('Error saving medication:', error);
        }
    };

    const saveReminder = async () => {
        const reminderData = {
            username: localStorage.getItem('username'),
            description: document.querySelector('input[name="description"]').value,
            time: document.querySelector('input[name="time"]').value,
            startingDate: document.querySelector('input[name="startingDate"]').value,
            lastDate: document.querySelector('input[name="lastDate"]').value,
            days: Array.from(document.querySelectorAll('input[name="days"]:checked')).map(el => el.value),
        };

        try {
            await axios.post('http://localhost:5000/api/reminders', reminderData);
            setReminderVisible(false);
            setShowPopupMessage(true);
            setTimeout(() => setShowPopupMessage(false), 3000);
        } catch (error) {
            console.error('Error saving reminder:', error);
        }
    };

    const fetchVisibleMedications = async () => {
        try {
            const username = localStorage.getItem('username');
            const response = await axios.get(`http://localhost:5000/api/medications/visible/${username}`);
            setVisibleMedications(response.data);
        } catch (error) {
            console.error('Error fetching visible medications:', error);
        }
    };

    useEffect(() => {
        fetchVisibleMedications();
    }, []);

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <h1 className={styles.header}>Settings</h1>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>User Information</h2>
                    <div className={styles.inputGroup}>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            className={styles.input}
                            value={userInfo.username}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            className={styles.input}
                            value={userInfo.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            className={styles.input}
                            value={userInfo.password}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className={styles.input}
                            value={userInfo.confirmPassword}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <button className={styles.editButton} onClick={toggleEdit}>
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Customize Reminders</h2>
                    <button className={styles.reminderButton} onClick={() => setReminderVisible(true)}>
                        Set Reminders
                    </button>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Edit Medications</h2>
                    <button className={styles.medicationButton} onClick={() => setMedicationVisible(true)}>
                        Edit Medications
                    </button>
                </div>

                {medicationVisible && (
                    <div className={styles.popup}>
                        <h2 className={styles.popupTitle}>Edit Medication</h2>
                        <form>
                            <div className={styles.inputGroup}>
                                <label>Name:</label>
                                <input name="medicationName" type="text" className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Dosage:</label>
                                <input name="dosage" type="number" defaultValue="0" className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Units:</label>
                                <select name="units" className={styles.input}>
                                    <option value="mg">mg</option>
                                    <option value="g">g</option>
                                    <option value="ml">ml</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Time of Day:</label>
                                <select name="timeOfDay" className={styles.input}>
                                    <option value="Any">Any</option>
                                    <option value="Morning">Morning</option>
                                    <option value="Afternoon">Afternoon</option>
                                    <option value="Evening">Evening</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Visible:</label>
                                <input name="visible" type="checkbox" className={styles.toggle} />
                            </div>
                            <div className={styles.buttonGroup}>
                                <button type="button" className={styles.cancelButton} onClick={() => setMedicationVisible(false)}>
                                    Cancel
                                </button>
                                <button type="button" className={styles.saveButton} onClick={saveMedication}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {reminderVisible && (
                    <div className={styles.popup}>
                        <h2 className={styles.popupTitle}>Set Reminder</h2>
                        <form>
                            <div className={styles.inputGroup}>
                                <label>Description:</label>
                                <input name="description" type="text" className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Time:</label>
                                <input name="time" type="time" className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Starting Date:</label>
                                <input name="startingDate" type="date" className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Last Date:</label>
                                <input name="lastDate" type="date" className={styles.input} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Days:</label>
                                <div className={styles.daysCheckboxGroup}>
                                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
                                        <label key={day}>
                                            <input name="days" value={day} type="checkbox" />
                                            {day}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.buttonGroup}>
                                <button type="button" className={styles.cancelButton} onClick={() => setReminderVisible(false)}>
                                    Cancel
                                </button>
                                <button type="button" className={styles.saveButton} onClick={saveReminder}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {showPopupMessage && (
                    <div className={styles.popupMessage}>Data saved successfully!</div>
                )}

                {visibleMedications.length > 0 && (
                    <div className={styles.visibleMedicationsPopup}>
                        <h3>Medication Details</h3>
                        <ul>
                            {visibleMedications.map((medication, index) => (
                                <li key={index}>
                                    {medication.name} - {medication.dosage}{medication.units} at {medication.timeOfDay}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
