'use client'
import { useState, useEffect } from "react"
import Calendar from "../components/calendar/calendar"
import handleCourse from "@/api/course.js";
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { forwardRef } from "react";
import "./courseForm.css"
import { sortedCourses } from "../Page_Profile/page.js";
import { getUserCourses } from "@/api/course.js";

export default function CalendarGUI() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(null);
    const [courseError, setCourseError] = useState('');
    const [sortedCourses, setSortedCourses] = useState([]); // State to hold fetched courses
    const [isLoadingCourses, setIsLoadingCourses] = useState(true); // Loading state
    const [courseData, setCourseData] = useState({
        name: "",
        description: "",
        term: "",
        year: new Date().getFullYear(),
        // username: currentUser
    });
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Wrap the logic in an async function
        const fetchCourses = async () => {
          const user = sessionStorage.getItem("currentUser");
          console.log("user", user);
          
          // Assuming getUserCourses is a function that fetches courses
          const fetchedCourses = await getUserCourses(user);
          setCourses(fetchedCourses);
          console.log("courses", fetchedCourses);
        };
        setIsLoadingCourses(false);
        fetchCourses();
      }, []); // Runs only once when component mounts

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "MED",
        relatedClass: "",
        date: "",
    });
    const [sessionData, setSessionData] = useState({
        title: "",
        description: "",
        duration: 0,
        date: "",
    });

    ///Calendar stuff///
    const [events, setEvents] = useState([]);

    // useEffect(() => {
    //     if (!currentUser) {
    //         router.push('/Page_Login');
    //     }
    // }, [currentUser, router]);

    //setting the form type
    const[activeForm, setActiveForm] = useState("task"); 

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        if (date === null) {
            setTaskData({
                title: "",
                description: "",
                priority: "MED",
                relatedClass: "",
            });
        }
    
    };

    const handleEventClick = () => {
        console.log("what");
    }

    //cancelling form submission
    const handleCancel = () =>{
        setActiveForm("task");
        setSelectedDate(null);
    }

    //toggle between forms
    const toggleForm = (type) =>{
        setActiveForm(type);
        erasePrev(type);
    }

    //erasing form data after switching
    const erasePrev = (switchedTo) => {
        if(switchedTo === "session")
            setTaskData({
                title: "",
                description: "",
                priority: "MED",
                relatedClass: "",
            });
        
        else if (switchedTo === "task")
            setSessionData({
                title: "",
                description: "",
                duration: 0,
                date: "",
            })

    }

    /////COURSE SECTION//////
    //Course Input
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log(`Handling input change for ${name}:`, value);
    //     setCourseData(prev => ({
    //         ...prev,
    //         [name]: name === 'year' ? parseInt(value, 10) : value,
    //         username: currentUser
    //     }));
    // };

    //Submitting course input
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setCourseError('');
    //     try {
    //         const courseWithUsername = {
    //             ...courseData,
    //             username: currentUser,
    //             year: parseInt(courseData.year, 10)
    //         };
            
    //         console.log('Submitting course data:', courseWithUsername);
            
    //         const response = await fetch('/api/courses', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(courseWithUsername),
    //         });

    //         const data = await response.json();
    //         console.log('Server response:', data);

    //         if (!response.ok) {
    //             if (response.status === 400) {
    //                 setCourseError(data.error);
    //                 return;
    //             }
    //             throw new Error(data.error || 'Failed to add course');
    //         }

    //         setCourseData({
    //             name: "",
    //             description: "",
    //             term: "",
    //             year: new Date().getFullYear(),
    //             username: currentUser
    //         });
            
    //     } catch (error) {
    //         console.error("Error adding course:", error);
    //         setCourseError('Failed to add course');
    //     }
    // };

    ///// TASKS SECTION /////
    //task input
    const handleTaskChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    //submitting task input
    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        taskData.date = new Date(selectedDate);
        taskData.user = sessionStorage.getItem('currentUser');
        console.log(taskData);
        const res = await fetch('/api/tasks', 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(taskData),
            });
        handleCancel();
        if (res.ok) {
            handleCancel();
        }
        //console.log(events);
    };

    ///// SESSION SECTION /////
    const handleSessionChange = (e) => {
        const { name, value } = e.target;
        setSessionData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSessionSubmit = async (e) => {
        e.preventDefault();
        sessionData.date = new Date(selectedDate);
        sessionData.user = sessionStorage.getItem('currentUser');
        const res = await fetch('/api/sessions', 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(sessionData),
            });
        handleCancel();
        if (res.ok) {
            handleCancel();
            if (calendarRef.current) {
                const calendarApi = calendarRef.current.getApi();
                if (calendarApi) {
                    calendarApi.refetchEvents(); // Refetch events
                }
            }
        }
    };

    return (
        <div className="layout-container">
            <div className="calendar-container">
                <Calendar 
                    onDateSelect={handleDateSelect} 
                    eventClick={handleEventClick} 
                />
            </div>
            {/* on this part, before the selected date, you want to display immediate tasks to the side */}
            
            {!selectedDate && <DisplayTasksRight/>}
            {selectedDate && (<div className="form-container">
                <div className="form-wrapper">
                    <div className="choice-wrapper">
                        <button
                            className={activeForm === "task" ? "active-button generic-button" : "generic-button"}
                            onClick={() => toggleForm("task")}
                        >
                            Task
                        </button>
                        <button
                            className={activeForm === "session" ? "active-button generic-button" : "generic-button"}
                            onClick={() => toggleForm("session")}
                        >
                            Session
                        </button>
                    </div>
                    
                    
                    {activeForm === "task" && (
                        <div className="task-form">
                            <h2>Add Task for {selectedDate?.toLocaleDateString()}</h2>
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
                                <div className="form-field">
                                    <label>Related Class:</label>
                                    <select
                                        name="relatedClass"
                                        value={taskData.relatedClass}
                                        onChange={handleTaskChange}
                                    >
                                        {isLoadingCourses ? (
                                            <option value="">Loading courses...</option>
                                        ) : (
                                            courses.map((course) => (
                                                <option key={course._id} value={course.name}>
                                                    {course.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                                <button type="submit" className="submit-button generic-button">
                                    Add Task
                                </button>
                            </form>
                        </div>
                    )}

                    {activeForm === "session" && (
                        <div className="session-form">
                            <h2>Add Session for {selectedDate?.toLocaleDateString()}</h2>
                            <form onSubmit={handleSessionSubmit} className="course-form">
                                <div className="form-field">
                                    <label>Session Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={sessionData.title}
                                        onChange={handleSessionChange}
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <label>Duration (minutes):</label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={sessionData.duration}
                                        onChange={handleSessionChange}
                                        required
                                    />
                                </div>

                                <div className="form-field">
                                    <label>Notes:</label>
                                    <textarea
                                        name="notes"
                                        value={sessionData.notes}
                                        onChange={handleSessionChange}
                                        rows="2"
                                    />
                                </div>

                                <button type="submit" className="submit-button">
                                    Add Session
                                </button>
                            </form>
                        </div>
                    )}
                    <button className='generic-button' onClick = {handleCancel}>Cancel</button>
                </div>
            </div>)}
            
        </div>
    );
}


function DisplayTasksRight() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks(limit = 5) {
            const username = sessionStorage.getItem('currentUser');
            try {
                const response = await fetch(`/api/tasks?username=${username}&limit=${limit}`);
                if (response.ok) {
                    const data = await response.json();
                    // Sort tasks by due date or priority (if needed)
                    const sortedTasks = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                    setTasks(sortedTasks);
                } else {
                    console.error('Failed to fetch tasks:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        fetchTasks();
    }, []); // Empty dependency array to run once on mount

    return (
        <div>
            <h2>Your Agenda</h2>
            <div>
                {tasks.map((task, i) => (
                    <div key={i}>
                        <TaskBox task={task} />
                    </div>

                ))}
            </div>
        </div>
    );
}


function TaskBox({ task }) {
    const taskBoxStyle = {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        margin: "10px 0",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    };

    return (
        <div style={taskBoxStyle}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {new Date(task.date).toLocaleDateString()}</p>
            <p>Priority: {task.priority}</p>
            {/* <p>Related Class: {task.relatedClass}</p> */}
        </div>
    );
}


/* <h2 className="form-title">Add Course</h2>
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


                        <Link href="/Page_Profile" style={{ width: '100%' }}>
                            <button className="fade submit-button" style={{ width: '100%' }}>
                                View Profile
                            </button>

                        <Link href="/Page_Profile">
                        <button className="fade">View Profile</button>

                        </Link>
                        
                    </form> */