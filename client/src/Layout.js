import { Outlet } from 'react-router-dom'

import NavBar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'

const Layout = () => {
    return (
        <main className="flex min-h-screen w-full bg-gray-50 dark:bg-primary">
            <Sidebar />

            <div className="flex w-full flex-col">
                <NavBar />

                <div className="flex-1 p-4 sm:p-8 md:p-10 xl:ml-24">
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default Layout
