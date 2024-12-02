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