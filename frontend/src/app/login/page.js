'use client';
import Link from 'next/link'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function Page(){
    const router = useRouter();

    async function handleSubmit (FormEvent) {
        router.push('/home');
    }
    
    return (
        <form>
            <p>Username</p>
            <input type = "text"/>
            <p>Password</p>
            <input type = "text"/>
            <button type = "submit" style ={{display: "block"}} onClick = {handleSubmit}>
                Click me to visit the home page!
            </button>
        </form>
    );
}