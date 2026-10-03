import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'DESIGN RESET — 30 Days to Sharpen Your Design Eye',description:'A deliberate practice studio for experienced designers.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
