'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';
import Link from 'next/link';
import { getUserCourses } from "@/api/course";
import styles from "../Page_Login/loginForm.css";

export default function ProfilePage() {
    const { currentUser, logout } = useUser();
    const router = useRouter();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) {
            router.push('/Page_Login');
            return;
        }

        const loadCourses = async () => {
            try {
                setIsLoading(true);
                const userCourses = await getUserCourses(currentUser);
                setCourses(userCourses);
            } catch (err) {
                console.error("Failed to fetch courses:", err);
                setError(err.message || "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        loadCourses();
    }, [currentUser, router]);

    const handleLogout = () => {
        logout();
        router.push('/Page_Login');
    };

    if (!currentUser) return null;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.profileContainer}>
            <h1 className={styles.welcomeBanner}>
                Welcome to Study Straight, {currentUser}!
            </h1>

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

            <div className={styles.buttonContainer}>
                <Link href="/Page_CourseForm">
                    <button className="fade">Go to Calendar</button>
                </Link>
                <button onClick={handleLogout} className="fade">
                    Logout
                </button>
            </div>
        </div>
    );
}


