import NavControl from '../panel/NavControl.jsx'
import SearchBar from '../searchbar/SearchBar.jsx'
import Slidebar from '../sidebar/Slidebar.jsx'

const NavBar = () => {
    return (
        <main className="sticky top-0 z-10">
            <nav className="flex w-full items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-secondary lg:p-4 xl:justify-end">
                <Slidebar />
                <SearchBar />
                <NavControl />
            </nav>
        </main>
    )
}

export default NavBar
