'use client'
import { useState } from "react"
import { useRouter } from 'next/navigation'
import styles from "../Page_Login/loginForm.css"
import Link from 'next/link';

export default function ProfilePage() {
    const [username, setUsername] = useState('JohnDoe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const handleSave = (event) => {
        event.preventDefault();
        // Here you would handle saving the profile changes to your server
        console.log("Profile saved:", { username, email });
        setIsEditing(false);  // Exit edit mode
    }

    return (
        <div className="container">
            <div className="profile-box">
                <h2>Profile</h2>

                <form onSubmit={handleSave}>
                    <div>
                        <label>Username</label>
                        {isEditing ? (
                            <input 
                                type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        ) : (
                            <p>{username}</p>
                        )}
                    </div>

                    <div>
                        <label>Email</label>
                        {isEditing ? (
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        ) : (
                            <p>{email}</p>
                        )}
                    </div>

                    <div>
                        {isEditing ? (
                            <button className="fade" type="submit">Save</button>
                        ) : (
                            
                            <button 
                                className="fade" 
                                type="button" 
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>
                            
                        )}
                    </div>

                    <Link href="/Page_CourseForm">
                    <button className="fade">Go to Calendar</button>
                    </Link>

                </form>
            </div>
        </div>
    )
}
