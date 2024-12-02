'use client'
import { useState, useEffect } from "react"
import Calendar from "../components/calendar/calendar"
import handleCourse from "@/api/course.js"
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';

export default function CourseForm() {
    const { currentUser } = useUser();
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(null);
    const [courseError, setCourseError] = useState('');
    const [courseData, setCourseData] = useState({
        name: "",
        description: "",
        term: "",
        year: new Date().getFullYear(),
        username: currentUser
    });
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "MED"
    });

    useEffect(() => {
        if (!currentUser) {
            router.push('/Page_Login');
        }
    }, [currentUser, router]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        if (!date) {
            setTaskData({
                title: "",
                description: "",
                priority: "MED"
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Handling input change for ${name}:`, value);
        setCourseData(prev => ({
            ...prev,
            [name]: name === 'year' ? parseInt(value, 10) : value,
            username: currentUser
        }));
    };

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

    const handleTaskChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        console.log('Task submitted:', { ...taskData, date: selectedDate });
        setTaskData({
            title: "",
            description: "",
            priority: "MED"
        });
    };

    return (
        <div className="layout-container">
            <div className="calendar-container">
                <Calendar onDateSelect={handleDateSelect} />
            </div>
            
            <div className="form-container">
                <div className="form-wrapper">
                    <h2 className="form-title">Add Course</h2>
                    <form onSubmit={handleSubmit} className="course-form">
                        <div className="form-field">
                            <label>Course Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={courseData.name}
                                onChange={handleInputChange}
                                required
                            />
                            {courseError && (
                                <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>
                                    {courseError}
                                </div>
                            )}
                        </div>
                        
                        <div className="form-field">
                            <label>Description:</label>
                            <textarea
                                name="description"
                                value={courseData.description}
                                onChange={handleInputChange}
                                rows="3"
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

                        <Link href="/Page_AddTask">
                        <button className="fade">Add Task</button>
                        </Link>

                        <Link href="/Page_Profile">
                        <button className="fade">View Profile</button>
                        </Link>
                        
                    </form>
                </div>

                {selectedDate && (
                    <div className="form-wrapper task-form">
                        <h2 className="form-title">Add Task for {selectedDate?.toLocaleDateString()}</h2>
                        <form onSubmit={handleTaskSubmit} className="course-form">
                            <div className="form-field">
                                <label>Task Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={taskData.title}
                                    onChange={handleTaskChange}
                                    required
                                />
                            </div>
                            
                            <div className="form-field">
                                <label>Description:</label>
                                <textarea
                                    name="description"
                                    value={taskData.description}
                                    onChange={handleTaskChange}
                                    rows="2"
                                    required
                                />
                            </div>
                            
                            <div className="form-field">
                                <label>Priority:</label>
                                <select
                                    name="priority"
                                    value={taskData.priority}
                                    onChange={handleTaskChange}
                                    required
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MED">Medium</option>
                                    <option value="HIGH">High</option>
                                </select>
                            </div>
                            
                            <button type="submit" className="submit-button">
                                Add Task
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
} 
