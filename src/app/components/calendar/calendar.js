'use client'

import { getSchedule } from '@/actions/action';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calendar.css';

export default function Calendar({ onDateSelect }) {
    const [selectedDate, setSelectedDate] = useState('');
    const [calendarApi, setCalendarApi] = useState(null);
    //const events = {};

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

    const refreshEvents = () => {
        //get all tasks
        //get all sessions
        //add it to the events array so it can be displayed on the calendar

    }
const events = [
  {
    title: "Math Study Group",
    start: new Date("Thu Nov 14 2024 00:00:00 GMT-0500 (Eastern Standard Time)"),
    allDay: true,
  },
  {
    title: "Physics Homework",
    start: "2024-12-02",
    allDay: true,
  },
  {
    title: "CS Project Meeting",
    start: "2024-12-03T14:00:00",
    end: "2024-12-03T15:30:00",
  },
  {
    title: "Biology Quiz Prep",
    start: "2024-12-04T18:00:00",
    end: "2024-12-04T24:00:00",
    backgroundColor: "#ff5733",
    textColor: "#ffffff",
  },]
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