'use client';
import { useState, useEffect, useMemo } from 'react';
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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!currentUser) {
            router.push('/Page_Login');
            return;
        }

        let isMounted = true;

        const loadCourses = async () => {
            try {
                const userCourses = await getUserCourses(currentUser);
                if (isMounted) {
                    setCourses(userCourses);
                    setIsLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Failed to fetch courses:", err);
                    setError(err.message || "An error occurred");
                    setIsLoading(false);
                }
            }
        };

        loadCourses();

        return () => {
            isMounted = false;
        };
    }, [currentUser]);

    const sortedCourses = useMemo(() => {
        return [...courses].sort((a, b) => {
            if (a.term === b.term) {
                return a.name.localeCompare(b.name);
            }
            return a.term.localeCompare(b.term);
        });
    }, [courses]);

    const handleLogout = () => {
        logout();
        router.push('/Page_Login');
    };

    if (!mounted) {
        return null;
    }

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
                    {sortedCourses.map((course) => (
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


