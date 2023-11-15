import { useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import ClickAwayListener from 'react-click-away-listener'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectUser, resetUser } from '../../features/auth/authSlice'

const Profile = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    const menuToggle = (e) => {
        setMenuOpen(!menuOpen)

        if (e.target.innerText === 'Account') {
            navigate('/setting')
        } else if (e.target.innerText === 'Logout') {
            navigate('/')
        }
    }

    let navigate = useNavigate()

    const logOut = (e) => {
        const auth = getAuth()

        signOut(auth)
            .then(() => {
                // Sign-out successful.
                dispatch(resetUser())

                menuToggle(e)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <button
                type="button"
                className="flex w-full items-center justify-center rounded-md p-2 text-sm font-medium text-gray-700 focus:outline-none dark:text-gray-50"
                id="options-menu"
                onClick={menuToggle}
            >
                {user?.profileImg ? (
                    <>
                        <img
                            alt="User Icon"
                            src={user.profileImg}
                            className="h-5 w-5 rounded-full object-cover lg:h-6 lg:w-6"
                        />
                    </>
                ) : (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 lg:h-6 lg:w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </>
                )}
            </button>

            {menuOpen && (
                <ClickAwayListener onClickAway={menuToggle}>
                    <div className="relative">
                        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-secondary">
                            <span
                                className="flex rounded-t-lg px-4 py-3 text-base text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-100 dark:hover:bg-tertiary dark:hover:text-white"
                                onClick={menuToggle}
                            >
                                Account
                            </span>

                            <span
                                className="flex rounded-b-lg px-4 py-3 text-base text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-100 dark:hover:bg-tertiary dark:hover:text-white"
                                onClick={logOut}
                            >
                                Logout
                            </span>
                        </div>
                    </div>
                </ClickAwayListener>
            )}
        </>
    )
}

export default Profile
