'use client'
import { useState } from "react";
import { login } from "@/actions/action"
// import styles from "./loginForm.css"
// import styles from "../components/calendar/calendar.css"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '../context/UserContext'; // Import the useUser hook

//add a use state so that you can call a function when the submit button is clicked, 
//ensure that the error message is only shown after inputting bad data, and it's removed when the user begins entering new data

export default function Page(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setCurrentUser } = useUser(); // Get setCurrentUser from context
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!username || !password) {
            alert("Please complete both fields.");
            return;
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError('Invalid username or password');
                return;
            }

            // Use sessionStorage instead of localStorage
            sessionStorage.setItem('currentUser', username);
            setCurrentUser(username);
            router.push('/Page_Profile');

            
        } catch (error) {
            setError('An error occurred during login');
            console.error('Login error:', error);
        }

        // } else {alert("Incorrect username or password")}

    }

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const formData = { username, password }; 

    //     if (!username || !password) {
    //         alert("Please complete both fields.");
    //         return;
    //     }
    //     if (await login(username, password)){
    //         setCurrentUser(username);
    //         router.push('/Page_Profile');
    //     } else {alert("Incorrect username or password")}
    // }

    return (
        <div className = "container">
            <div className = "login-box">
                <h2>Login</h2>

                {error && (
                    <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
                        {error}
                    </div>
                )}


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
                    <Link href="/Page_Signup"> <u>Sign up today!</u> </Link>
                </div>
            </div>
        </div>
    )
}