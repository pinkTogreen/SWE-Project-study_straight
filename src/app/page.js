'use client'
import LoginForm from "./Login/loginForm.js"
import Signup from "./Signup/signup.js"
import Calendar from "./components/calendar/calendar"
import TaskInput from "./components/addTask/task"
import handleSignup from "@/api/signup.js"
import handleVerify from "@/api/auth.js"

export default function Home(){
	// const testSignup = async () => {
	// 	let response = await handleVerify({ username: "test", password: "pass"});
	// }

	return(
		<main>
			{/* <button 
			type = "submit"
			onClick={testSignup}>test</button>
			<Calendar/> */}
			{/* <LoginForm/> */}
			<Signup/>
		</main>
	);
}

