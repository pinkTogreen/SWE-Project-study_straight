'use client';
import Link from 'next/link'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter();

    return(
        <div>
            <p>This will be the home page.</p>
            <button onClick={() => router.back()}>
                Temporary back button
            </button>
        </div>
    );
}