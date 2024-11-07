'use client'

import styles from './calendar.css';
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { addTask } from '@/actions/action';

export default function Page() {
  const [openTask, setOpenTask] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleClick = (event) => {
    console.log('date clicked: ' + event.dateStr);
    setSelectedDate(event.dateStr); // Store the clicked date
    setOpenTask(true); // Show the task input form
  };

  const task_handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { title, desc, date: selectedDate };

    if (!title) {
      alert('Please enter a title.');
      return;
    }

    // Add the task (replace with your own implementation)
    await addTask(title, selectedDate, desc);

    // Optionally, reset the form and close it
    setTitle('');
    setDesc('');
    setOpenTask(false);
  };

  const getEvents = () => {
      //getting events from the user after every NEW ADDITION to the calendar
  }

  return (
    <div>
      <nav>StudyStraight</nav>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          //events={eventsList}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay',
          }}
          dateClick={handleClick}
        />
        {openTask && (
          <div>
            <h1>Add New Task for {selectedDate}</h1>
            <form onSubmit={task_handleSubmit}>
              <div>
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <button type="submit">Add Task</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
