import { UserProvider } from './context/UserContext';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
    title: 'Study Straight',
    description: 'Study planning and organization tool'
};

export default function RootLayout({ children }) {


    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen`}>
                <UserProvider>
                    {children}
                </UserProvider>
            </body>
        </html>
    );
}

// export default function RootLayout({ children }) {
//   return (
//     <UserProvider>
//     <html lang="en">
//         <body className={`${inter.className} min-h-screen`}>
//           <main className="content">{children}</main>
//         </body>
//       </html>
//     </UserProvider>
//   );
// }

// export function generateMetadata() {
//   return {
//     title: 'Study Straight',
//     description: 'Study planning and organization tool'
//   }
// }



/*


*/

