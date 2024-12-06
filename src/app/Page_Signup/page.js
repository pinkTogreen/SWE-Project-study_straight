'use client'
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { addAccount } from "@/actions/action"
import { useUser } from '../context/UserContext'; // Import the useUser hook
import handleSignup from "../../api/signup"
import styles from "../Page_Login/loginForm.css"
import Link from 'next/link';

export default function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePass, setretypePass] = useState('');
    const { setCurrentUser } = useUser(); // Get setCurrentUser from context
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { username, password }; 

        //get the form data, check

        if (!username || !password) {
            alert("Please complete both fields.");
            return;
        }
        if(retypePass != password){
            alert("Passwords do not match.");
            return;
        }

        const res = await fetch(`/api/auth/signup?username=${username}`, 
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });

        if(res.status === 200)
        {   
            console.log("itso k");
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            sessionStorage.setItem('currentUser', username);
            setCurrentUser(username);
            router.push('/Page_Profile');

        }
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
                        <div>
                            <input 
                            type="password" 
                            placeholder="Re-enter your password"
                            value = {retypePass}
                            onChange = {(e) => setretypePass(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className = "fade">Enter</button>
                </form>

                <div 
                    className = "message">
                    <p>Already a user?</p>
                    <Link href="/Page_Login"> <u>Login!</u> </Link>
                </div>
            </div>

        </div>
    );
}