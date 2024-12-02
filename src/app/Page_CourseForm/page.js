'use client'
import { useState, useEffect } from "react"
import Calendar from "../components/calendar/calendar"
import handleCourse from "@/api/course.js"
import { addTask } from "@/actions/action"
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import "./courseForm.css"

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
        priority: "MED",
        date: ""
    });
    const [sessionData, setSessionData] = useState({
        title: "",
        description: "",
        duration: 0,
        date: "",
    });

    useEffect(() => {
        if (!currentUser) {
            router.push('/Page_Login');
        }
    }, [currentUser, router]);

    //setting the form type
    const[activeForm, setActiveForm] = useState("task"); 
  
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
        // //console.log('Task submitted:', { ...taskData, date: selectedDate });
        taskData.date = selectedDate;
        console.log(taskData);
        await addTask(taskData);
        // setTaskData({
        //     title: "",
        //     description: "",
        //     priority: "MED",
        //     date: "",
        // });
    };
    

    ///// SESSION SECTION /////
    //session input
    const handleSessionChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    //submitting session input
    const handleSessionSubmit = async (e) => {
        e.preventDefault();
        console.log('Session submitted:', { ...taskData, date: selectedDate });
        setTaskData({
            title: "",
            description: "",
            priority: "MED"
        });
    };


    /////CANCELLING INPUT/////
    const handleCancel = () =>{
        //reset status
        setActiveForm("task");
        setSelectedDate(null);
    }

    return (
        <div className="layout-container">
            <div className="calendar-container">
                <Calendar onDateSelect={handleDateSelect} />
            </div>

            {selectedDate && (<div className="form-container">
                <div className="form-wrapper">
                    <div className="choice-wrapper">
                        <button
                            className={activeForm === "task" ? "active-button" : ""}
                            onClick={() => setActiveForm("task")}
                        >
                            Task
                        </button>
                        <button
                            className={activeForm === "session" ? "active-button" : ""}
                            onClick={() => setActiveForm("session")}
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