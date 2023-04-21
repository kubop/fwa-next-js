import { ReactNode } from 'react'
import Navbar from './Navbar'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <>
            <Navbar />
            <main>{ children }</main>
        </>
    )
}