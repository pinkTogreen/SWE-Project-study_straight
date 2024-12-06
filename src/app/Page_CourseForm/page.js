'use client'
import { useState, useEffect } from "react"
import Calendar from "../components/calendar/calendar"
import handleCourse from "@/api/course.js";
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import { forwardRef } from "react";
import "./courseForm.css"

export default function CalendarGUI() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(null);
    const [courseError, setCourseError] = useState('');
    const [courseData, setCourseData] = useState({
        name: "",
        description: "",
        term: "",
        year: new Date().getFullYear(),
        // username: currentUser
    });
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "MED",
        date: ""
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
                priority: "MED"
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
                priority: "MED"
            });
        
        else if (switchedTo === "task")
            setSessionData({
                title: "",
                description: "",
                duration: 0,
                date: "",
            })

    }

    

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
                            className={activeForm === "task" ? "active-button" : ""}
                            onClick={() => toggleForm("task")}
                        >
                            Task
                        </button>
                        <button
                            className={activeForm === "session" ? "active-button" : ""}
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

                                <button type="submit" className="submit-button">
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
                    <button onClick = {handleCancel}>Cancel</button>
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
        </div>
    );
}
