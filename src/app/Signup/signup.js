'use client'
import { useState } from "react"
import { signup } from "@/actions/action"
import { useRouter } from 'next/navigation'
import handleSignup from "../../api/signup"


export default function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { username, password }; 

        if (!username || !password) {
            alert("Please complete both fields.");
            return;
        }
        console.log("log");
        let fail = await signup(username, password);

    }
    
    return (
        <div className = "container">
            <div className = "login-box">

                <h2>Signup</h2>
                {/* 
                NOTES:
                currently figuring this out, as the password textboxes take the same input at the same time
                so when you're typing in one box, you're typing in the other at once
                css looks wonky on the SignUp page
                */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                        type="text" 
                        placeholder="Username"
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                        />
                        <input 
                        type="password" 
                        placeholder="Password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        />
                        <input 
                        type="password" 
                        placeholder="Re-enter your password"
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className = "fade">Submit</button>

                </form>

                <div 
                    className = "message">
                    <p>Already a user?</p>
                    <i><u>Login!</u></i>
                </div>
            </div>

        </div>
    );
}