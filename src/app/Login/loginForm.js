
'use client'
import { useState } from "react"
import { login } from "@/actions/action"
// import styles from "./loginForm.css"
import { useRouter } from 'next/navigation'

//add a use state so that you can call a function when the submit button is clicked, 
//ensure that the error message is only shown after inputting bad data, and it's removed when the user begins entering new data

export default function Page(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { username, password }; 
        
        //right now there's nothing to move to a new page, but that will be dealt with
        let response = await login(username, password);
        console.log(response);

    }


    return (
        <div className = "container">
            <div className = "login-box">

                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                        type="text" 
                        placeholder="Username"
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <input 
                        type="password" 
                        placeholder="Password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className = "fade">Enter</button>

                </form>

                <div 
                    className = "message">
                    <p>New user?</p>
                    <i><u>Sign up today!</u></i>
                </div>
            </div>

        </div>
    )
}