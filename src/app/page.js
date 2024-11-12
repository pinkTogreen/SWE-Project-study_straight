'use client'
import LoginForm from "./Login/loginForm.js"
import Signup from "./Signup/signup.js"
import Calendar from "./components/calendar/calendar"
import TaskInput from "./components/addTask (MIGHT BE REMOVED)/task.js"
import handleCourse from "@/api/course.js"
// import handleSignup from "@/api/signup.js"
// import handleVerify from "@/api/auth.js"

export default function Home(){
	const test = async () => {
		const course = {
			name: "CAP 3027",
			description: "description test",
			term: "Fall",
			year: 2024,
		}
		let response = await handleCourse("POST", course);
		console.log(response);
	}

	return(
		<main>
			<button 
			type = "submit"
			onClick={test}>test</button>
			{/* <Calendar/> */}
			{/* <LoginForm/> */}
			{/* <Signup/> */}
			{/* <TaskInput/> */}
		</main>
	);
}

