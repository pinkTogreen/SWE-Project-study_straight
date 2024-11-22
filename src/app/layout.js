import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from './context/UserContext';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <UserProvider>
    <html lang="en">
        <body className={`${inter.className} min-h-screen`}>
          {children} {}
        </body>
      </html>
    </UserProvider>
  );
}

export function generateMetadata() {
  return {
    title: 'Study Straight',
    description: 'Study planning and organization tool'
  }
}