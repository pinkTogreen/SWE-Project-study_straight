'use client'
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getSchedule } from '@/actions/action';
import './calendar.css';

export default function Calendar({ onDateSelect }) {
    const [selectedDate, setSelectedDate] = useState('');
    const [calendarApi, setCalendarApi] = useState(null);
    const [events, setEvents] = useState([]);
    
    const mapTasksToEvents = (tasks) => {
        return tasks.map(task => ({
          id: task._id.toString(), // Use MongoDB document ID
          title: task.title, // Task title
          start: task.date, // Use the task date as the start
          allDay: true, // Assuming tasks are all-day events
          description: task.description || '', // Task description
          completed: task.completed, // Custom property to track completion
          backgroundColor: task.completed ? '#d3d3d3' : '#5bc0de', // Grey for completed, blue for incomplete
          textColor: task.completed ? '#808080' : '#000000', // Optional: Grey text for completed
          extendedProps: { // Add any additional properties here
            priority: task.priority,
            courseId: task.courseId,
            user: task.user,
          },
        }));
    };

    const fetchAndSetTasks = async () => {
        const username = sessionStorage.getItem('currentUser');
    
        let data = null;
    
        // 1) Get tasks belonging to the current user
        console.log(username);

        const res = await fetch(`/api/tasks?username=${username}`, 
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        // 2) If the result was successfully obtained, store it
        if (res.ok) {
            data = await res.json();
            console.log('User tasks:', data);
        } else {
            console.log(res);
        }
    
        // 3) Set the events array
        if(data != null){
            let events2 = mapTasksToEvents(data);
                    setEvents(events2);

        }
       
        
    };
    

    const handleClick = (event) => {
        if (calendarApi) {
            // Remove previous selection
            document.querySelectorAll('.selected-day').forEach(el => {
                el.classList.remove('selected-day');
            });

            if (selectedDate !== event.dateStr) {
                // New date selected
                event.dayEl.classList.add('selected-day');
                setSelectedDate(event.dateStr);
                if (onDateSelect) {
                    onDateSelect(event.date);
                }
            } else {
                // Same date clicked - deselect
                setSelectedDate('');
                if (onDateSelect) {
                    onDateSelect(null);
                }
            }
        }
    };

    useEffect(() => {
        fetchAndSetTasks();
    }, []);

    return (
        <div className="calendar-wrapper">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay',
                }}
                events = {events}
                dateClick={handleClick}
                height="100%"
                ref={(el) => {
                    if (el) {
                        setCalendarApi(el.getApi());
                    }
                }}
            />
        </div>
    );
}