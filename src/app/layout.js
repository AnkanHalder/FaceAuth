import "./css_reset.css";
import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from "@/contexts/LoginContext";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Face Auth',
  description: 'Facial Authentication',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
