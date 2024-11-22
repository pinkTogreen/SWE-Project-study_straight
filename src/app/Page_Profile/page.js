'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';
import Link from 'next/link';
import { getUserCourses } from "@/api/course";
import styles from "../Page_Login/loginForm.css";

export default function ProfilePage() {
    const { currentUser } = useUser(); // Access the currentUser from context
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const userCourses = await getUserCourses(currentUser);
                setCourses(userCourses);
            } catch (err) {
                console.error("Failed to fetch courses:", err);
                setError(err.message || "An error occurred");
            }
        };

        if (currentUser) loadCourses();
    }, [currentUser]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.profileContainer}>
            {/* Welcome Banner */}
            <h1 className={styles.welcomeBanner}>
                Welcome to Study Straight, {currentUser}!
            </h1>

            {/* Courses List */}
            <h2 className={styles.coursesTitle}>My Courses</h2>
            {courses.length > 0 ? (
                <ul className={styles.courseList}>
                    {courses.map((course) => (
                        <li key={course._id} className={styles.courseItem}>
                            <span className={styles.courseName}>{course.name}</span> - 
                            <span className={styles.courseDescription}>{course.description}</span> - 
                            <span className={styles.courseTerm}>{course.term}</span>   
                            <span className={styles.courseYear}>{course.year}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className={styles.noCoursesMessage}>No courses found.</p>
            )}

            {/* Navigation Button */}
            <Link href="/Page_CourseForm">
                <button className="fade">Go to Calendar</button>
            </Link>
        </div>
    );
}
