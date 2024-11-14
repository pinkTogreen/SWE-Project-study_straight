'use client'
import { useState } from "react"
import Calendar from "./calendar/calendar"
import handleCourse from "@/api/course.js"

export default function CourseForm() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [courseData, setCourseData] = useState({
        name: "",
        description: "",
        term: "",
        year: new Date().getFullYear()
    });
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "MED"
    });

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
        setCourseData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await handleCourse("POST", courseData);
            console.log(response);
            setCourseData({
                name: "",
                description: "",
                term: "",
                year: new Date().getFullYear()
            });
        } catch (error) {
            console.error("Error adding course:", error);
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