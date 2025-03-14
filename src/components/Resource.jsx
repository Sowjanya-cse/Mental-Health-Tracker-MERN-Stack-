import React from 'react';
import Sidebar from '../Sidebar/Sidebar'; // Import the Sidebar component
import styles from './Resource.module.css'; // Import the CSS module
import { FaFileAlt, FaVideo, FaPeopleArrows, FaPhoneAlt } from 'react-icons/fa'; // Import icons

const Resource = () => {
    return (
        <div className={styles.container}>
            <Sidebar /> {/* Sidebar on the left */}
            <div className={styles.mainContent}>
                <h1 className={styles.header}>Resources</h1>
                <p className={styles.subHeader}>Explore helpful content and tools for mental health support.</p>

                {/* Articles Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}><FaFileAlt /> Articles</h2>
                    <div className={styles.articleList}>
                        <div className={styles.articleItem}>
                            <strong>Stress Management:</strong> Simple tips for managing daily stress.
                        </div>
                        <div className={styles.articleItem}>
                            <strong>Anxiety Relief:</strong> Techniques to cope with anxiety.
                        </div>
                        <div className={styles.articleItem}>
                            <strong>Understanding Depression:</strong> Learn the signs and how to seek help.
                        </div>
                        <div className={styles.articleItem}>
                            <strong>Sleep & Mental Health:</strong> Improve your sleep to boost mental well-being.
                        </div>
                    </div>
                </div>

                {/* Videos Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}><FaVideo /> Videos</h2>
                    <div className={styles.videoList}>
                        <div className={styles.videoItem}>
                            <strong>Mindfulness for Beginners:</strong> A short guided meditation.
                        </div>
                        <div className={styles.videoItem}>
                            <strong>Mental Health Talks:</strong> Expert advice on managing anxiety.
                        </div>
                        <div className={styles.videoItem}>
                            <strong>Coping Strategies:</strong> Practical tips for emotional resilience.
                        </div>
                    </div>
                </div>

                {/* Community Support Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}><FaPeopleArrows /> Community Support</h2>
                    <div className={styles.supportList}>
                        <div className={styles.supportItem}>
                            <strong>
                                <a href="https://yourdost.com/" target="_blank" rel="noopener noreferrer">
                                    YourDOST Counseling
                                </a>
                            </strong>: Anonymous chat with professionals.
                        </div>
                        <div className={styles.supportItem}>
                            <strong>
                                <a href="https://saahas.org/" target="_blank" rel="noopener noreferrer">
                                    SAAHAS Support Group
                                </a>
                            </strong>: Group sessions and online forums.
                        </div>
                        <div className={styles.supportItem}>
                            <strong>
                                <a href="https://icallhelpline.org/" target="_blank" rel="noopener noreferrer">
                                    iCall
                                </a>
                            </strong>: Mental health support via a helpline.
                        </div>
                    </div>
                </div>

                {/* Hotlines & Contacts Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}><FaPhoneAlt /> Hotlines & Contacts</h2>
                    <div className={styles.contactList}>
                        <div className={styles.contactItem}>
                            <strong>KIRAN Helpline:</strong> 1800-599-0019 (24/7)
                        </div>
                        <div className={styles.contactItem}>
                            <strong>Vandrevala Foundation Helpline:</strong> 1860-266-2345
                        </div>
                        <div className={styles.contactItem}>
                            <strong>Snehi India:</strong> 91-22-2772 6771
                        </div>
                        <div className={styles.contactItem}>
                            <strong>iCall by TISS:</strong> 022-25521111
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resource;
