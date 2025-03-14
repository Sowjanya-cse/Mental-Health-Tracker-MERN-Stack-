import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import { RiMentalHealthFill } from "react-icons/ri";

const HomePage = () => {
    const featuresRef = useRef(null);
    const aboutUsRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.homepageContainer}>
            <nav className={styles.homepageNavbar}>
                <ul className={styles.homepageNavLinks}>
                    <li><button onClick={() => scrollToSection(featuresRef)}>Features</button></li>
                    <li><button onClick={() => scrollToSection(aboutUsRef)}>About Us</button></li>
                    <li><button onClick={() => scrollToSection(contactRef)}>Contact</button></li>
                </ul>
                <button className={styles.homepageStartTrackingBtn}>
                    <Link to="/login-register" style={{ color: 'white', textDecoration: 'none' }}>
                        Start Tracking
                    </Link>
                </button>
            </nav>

            <div className={styles.homepageLogo}>
                <h1><RiMentalHealthFill /> <b>MTracker</b></h1>
            </div>
            <main className={styles.homepageMainContent}>
                <h2 className={styles.homepageMainHeading}><strong>The Easiest Way to Track Your Moods Online or Offline</strong></h2>
                <p className={styles.homepageDescription}>
                    MTracker is a user-friendly app for patients to track symptom data relating to Bipolar I and II disorders, Depression, PTSD, and Anxiety Disorders. Identify triggers and patterns to help prevent relapses, and enhance doctor's visits with detailed data exports.
                </p>
            </main>

            {/* Sections for Features, About Us, and Contact */}
            <section ref={featuresRef}>
                <h2>Features</h2>
                <p><b>1. Mood Logging: </b>
                Effortlessly log your daily moods using intuitive sliders to track emotional states like happiness, sadness, and anxiety.</p>
                <p><b>2. Sleep Tracking: </b>
                Monitor your sleep patterns and understand how they affect your mood to improve your sleep quality.</p>
                <p><b>3. Notes Section: </b>
                Capture your thoughts and reflections in a dedicated notes area for enhanced self-awareness.</p>
                <p><b>4. User-Friendly Interface: </b>
                Enjoy a clean and easy-to-navigate design for a seamless logging experience.</p>
                <p><b>5. Insights and Trends: </b>
                Receive personalized insights based on your logged data to identify mood patterns and triggers.</p>
                <p><b>6. Privacy and Flexibility: </b>
                Your data is secure, with the flexibility to log at your own pace while maintaining your privacy.</p>
                <p><b>7. Supportive Community: </b>
                Connect with a community of users for shared experiences and support on your mental health journey.</p>
            </section>

            <section ref={aboutUsRef}>
                <h2>About Us</h2>
                <p><b>Our Mission:</b> At MTracker, we are dedicated to supporting individuals on their mental health journey. We believe in the power of self-awareness and reflection as tools for personal growth and healing.</p>
                <p><b>Who We Are:</b> MTracker is a team of mental health advocates, developers, and designers passionate about creating a supportive community for users. Our app is designed to empower users to take charge of their mental health through effective tracking and personalized insights.</p>
                <p><b>Our Vision:</b> We envision a world where mental health is prioritized, and individuals have the tools and resources to navigate their emotional landscapes. Through MTracker, we aim to foster a culture of understanding and compassion for mental health.</p>
                <p><b>Join Us:</b> Whether you're looking to better understand your mood patterns or find uplifting activities, MTracker is here to help. Join our community and take the first step toward a more mindful and positive approach to mental well-being.</p>
            </section>

            <section ref={contactRef}>
                <h2>Contact</h2>
                <p><b>Get in Touch:</b> We’d love to hear from you! Whether you have questions, feedback, or suggestions, your thoughts are important to us.</p>
                <p><b>Feedback Form:</b> Submit Feedback to help us improve your experience and the features you’d like to see in MTracker.</p>
                <p><b>Social Media:</b> Connect with us on Twitter, Facebook, and Instagram for updates, tips, and community stories.</p>
                <p><b>Email:</b> For inquiries or support, reach us at support@mtracker.com.</p>
            </section>
        </div>
    );
};

export default HomePage;
