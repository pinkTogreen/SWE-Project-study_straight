import Link from 'next/link';
import styles from "./Page_Login/loginForm.css"

export default function Home() {
    const buttonStyle = {
        margin: '10px',
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textDecoration: 'none',
    };

    return (
        <main className="container-main">
            <h1>Welcome to Study Straight!</h1>
            <div>
                <Link href="/Page_Login" style={buttonStyle}>
                    Login
                </Link>
            </div>
        </main>
    );
}
