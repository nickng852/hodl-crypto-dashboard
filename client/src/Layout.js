import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { Outlet } from 'react-router-dom'

import NavBar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'

const Layout = () => {
    return (
        <>
            <div className="absolute inset-0 flex">
                <Sidebar />
                <main className="flex h-full w-full flex-col overflow-hidden bg-gray-50 dark:bg-primary">
                    <NavBar />

                    <PerfectScrollbar className="h-full overflow-auto p-4 sm:p-8 md:p-10">
                        <Outlet />
                    </PerfectScrollbar>
                </main>
            </div>
        </>
    )
}

export default Layout
