'use client'

import styles from './calendar.css';
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { addTask } from '@/actions/action';
// import TaskInput from '../addTask/task';

export default function Page() {
  const [openTask, setOpenTask] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleClick = (event) => {
    console.log(event.dateStr);
    if(selectedDate === event.dateStr){
      setOpenTask(!openTask);
    }
    setSelectedDate(event.dateStr); // Store the clicked date
    console.log(selectedDate); 
    // Show the task input form
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
            <TaskInput 
            selectedDate={selectedDate}
            isDisplayed={openTask}/>
          </div>
        )}
      </div>
    </div>
  );
}

//A function to add tasks is contained within the calendar page
function TaskInput({selectedDate, isDisplayed}){
  const [taskDetails, setTaskDetails] = useState({
      title: '',
      priority: 'MED',
      description: '',
      date: selectedDate || '',
      completed: false,
      userID: "test",
      courseID: "test",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setTaskDetails({ ...taskDetails, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Task details', taskDetails);
      setOpenTask(false);
    };

  if(isDisplayed){
  return(
  <form onSubmit = {handleSubmit}>
      <div>
          <label>
              Title:
              <input
                  type="text"
                  name="title"
                  value={taskDetails.title}
                  onChange={handleChange}
                  required
              />
          </label>
      </div>

      <div>
          <label>Description</label>
          <input
              type="text"
              name="description"
              value={taskDetails.description}
              onChange={handleChange}
              required
          />
      </div>

      <div>
      <label>Priority:</label>
      <select
        name="priority"
        value={taskDetails.priority}
        onChange={handleChange}
      >
        <option value="LOW">Low</option>
        <option value="MED">Medium</option>
        <option value="HIGH">High</option>
      </select>
    </div>
    <button type="submit">Save Task</button>
  </form>
  );
  }
}
