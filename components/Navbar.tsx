import Link from 'next/link'
import Image from 'next/image'

import { useUserEdits } from '@/contexts/UserEditsContext'
import { useRouter  } from 'next/router'
import Counter from './Counter'

const activeLinkStyle = "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" 
const baseLinkStyle = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"

export default function Navbar() {
    console.log('Rendering navbar')
    const router = useRouter()

    const activePath = router.asPath.substring(1).split('/')[0]

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4 justify-between md:justify-normal">
                <Link href="/" className="flex items-center">
                    <Image 
                        src="https://flowbite.com/docs/images/logo.svg" 
                        className="h-8 mr-3" 
                        alt="Flowbite Logo" 
                        width="32"
                        height="33"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FWA</span>
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto ml-8" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link 
                                href="/" 
                                className={activePath === '' ? activeLinkStyle : baseLinkStyle}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/users" 
                                className={activePath === 'users' ? activeLinkStyle : baseLinkStyle}
                            >
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/addresses" 
                                className={activePath === 'addresses' ? activeLinkStyle : baseLinkStyle}
                            >
                                Addresses
                            </Link>
                        </li>
                        <li>
                            <Counter />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}