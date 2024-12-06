'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';
import Link from 'next/link';
import { getUserCourses } from "@/api/course";
import "./profile.css";

export default function ProfilePage() {
    const { currentUser, logout } = useUser();
    const router = useRouter();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [courseError, setCourseError] = useState('');
    const [courseData, setCourseData] = useState({
        name: "",
        description: "",
        term: "",
        year: new Date().getFullYear(),
        username: currentUser
    });


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
        console.log(courses);
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

    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await fetch(`/api/courses/${courseId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove course from state
                setCourses(courses.filter(course => course._id !== courseId));
            }
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    /////COURSE SECTION//////
    //Course Input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Handling input change for ${name}:`, value);
        setCourseData(prev => ({
            ...prev,
            [name]: name === 'year' ? parseInt(value, 10) : value,
            username: currentUser
        }));
   };

   //Submitting course input
   const handleSubmit = async (e) => {
        e.preventDefault();
        setCourseError('');
        try {
            const courseWithUsername = {
                ...courseData,
                username: currentUser,
                year: parseInt(courseData.year, 10)
            };
           
            console.log('Submitting course data:', courseWithUsername);
           
            const response = await fetch('/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseWithUsername),
            });

            const data = await response.json();
            console.log('Server response:', data);

            if (!response.ok) {
                if (response.status === 400) {
                    setCourseError(data.error);
                    return;
                }
                throw new Error(data.error || 'Failed to add course');
            }

            setCourseData({
                name: "",
                description: "",
                term: "",
                year: new Date().getFullYear(),
                username: currentUser
            });
           
        } catch (error) {
            console.error("Error adding course:", error);
            setCourseError('Failed to add course');
        }
   };


    if (!mounted) {
        return null;
    }

    if (!currentUser) return null;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="profileContainer">
            <h1 className="welcomeBanner">
                Welcome to Study Straight, {currentUser}!
            </h1>

            <h2 className="coursesTitle">My Courses</h2>
            {courses.length > 0 ? (
                <ul className="courseList">
                    {sortedCourses.map((course) => (
                        <li key={course._id} className="courseItem">
                            <div className="course-content">
                                <span className="courseName">{course.name}</span> - 
                                <span className="courseDescription">{course.description}</span> - 
                                <span className="courseTerm">{course.term}</span>   
                                <span className="courseYear">{course.year}</span>
                            </div>
                            <button 
                                className="delete-button" 
                                onClick={() => handleDeleteCourse(course._id)}
                                title="Delete course"
                            >
                                − 
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="noCoursesMessage">No courses found.</p>
            )}

<h2 className="form-title">Add Course</h2>
            <form onSubmit={handleSubmit} className="course-form">
                <div className="form-row">
                    <div className="form-field">
                        <label>Course Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={courseData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={courseData.description}
                            onChange={handleInputChange}
                            rows="2"
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label>Term:</label>
                        <select
                            name="term"
                            value={courseData.term}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Term</option>
                            <option value="Fall">Fall</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Year:</label>
                        <input
                            type="number"
                            name="year"
                            value={courseData.year}
                            onChange={handleInputChange}
                            min="2024"
                            max="2030"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Add Course
                    </button>
                </div>
                {courseError && (
                    <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>
                        {courseError}
                    </div>
                )}
            </form>


            <div className="buttonContainer">
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


