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
export default function TaskInput({selectedDate}){
    //retrieve a json of courses from the database

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
      };

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