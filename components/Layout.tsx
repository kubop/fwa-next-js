import { ReactNode } from 'react'
import Navbar from './Navbar'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Navbar />
            <main className="dx-viewport">{ children }</main>
        </>
    )
}