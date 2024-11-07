'use client'
import { useState } from "react"
import { addTask } from "@/actions/action";

/**
the task window will require a name, a description, a date and a time 
we could store this information as a map, and create our data from then

I believe it would be easier if we could select the date from the calendar, 
rather than inputting it as text
but how can we get the date from the calendar?

if the user clicks a certain spot on the calendar, then they will be prompted to add a task on that day
this can be achieved with "dateClick" provided by FullCalendar
we would then parse the string that is resulted from the dateClick function, as it looks like this
YYYY-MM-DD, we can send that result here
Since FullCalendar doesn't require integer types to display the information in the correct place, we just need to store it as a string
if we wanted to display the task from the event


*/
export default function TaskInput(){

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { title, desc }; 

        if (!title) {
            alert("Please enter a title.");
            return;
        }
        
        addTask(title, description);

    }

    return(
    <form>
        <h1>Add New Task</h1>
        
            <div>
            <input 
            type = "text"
            value = {title}
            onChange = {(e) => setTitle(e.target.value)}
            />
            </div>
            
            <div>
            <input 
            type = "text"
            value = {desc}
            onChange = {(e) => setDesc(e.target.value)}
            />
            </div>
    </form>
    );
}