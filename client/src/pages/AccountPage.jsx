import { useState, useEffect } from 'react'
import {
    getAuth,
    updateEmail,
    sendPasswordResetEmail,
    deleteUser,
} from 'firebase/auth'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from 'firebase/storage'
import ClickAwayListener from 'react-click-away-listener'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import defaultImg from '../assets/images/empty-user.png'
import { selectUser, resetUser } from '../features/auth/authSlice'
import { db } from '../firebase/firebase.config'
import useForm from '../hooks/form'

const AccountPage = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [profileImg, setProfileImg] = useState(null)
    const [isUpdated, setIsUpdated] = useState(false) // whether "Name" or "Email" has been updated
    const [isEmailSent, setIsEmailSent] = useState(false) // whether Password Reset Email has been sent

    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    // Custom Hook
    const {
        initialState,
        form,
        setForm,
        setName,
        errorMessage,
        setErrorMessage,
        handleChange,
        isAccountFormValid,
    } = useForm()

    let navigate = useNavigate()

    const menuToggle = () => {
        setMenuOpen(!menuOpen)
    }

    const modalToggle = () => {
        setModalOpen(!modalOpen)
    }

    const updateToggle = () => {
        setIsUpdated(!isUpdated)
    }

    const sendEmailToggle = () => {
        setIsEmailSent(!isEmailSent)
    }

    // ----- Firebase -----

    // Authentication
    const auth = getAuth()

    // Firestore Database
    const docRef = doc(db, 'users', auth.currentUser.uid)

    // Storage
    const storage = getStorage()
    const storageRef = ref(storage, 'userProfileImg/' + user.uid)

    // Update User Profile Image (Instantly)
    useEffect(() => {
        if (profileImg != null) {
            uploadBytes(storageRef, profileImg).then(() => {
                getDownloadURL(storageRef)
                    .then((url) => {
                        const docData = {
                            profileImg: url,
                        }

                        updateDoc(docRef, docData)

                        setProfileImg(null)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
        }
    }, [profileImg, storageRef, docRef])

    const resetProfileImg = () => {
        setModalOpen(false)

        const docData = {
            profileImg: null,
        }

        updateDoc(docRef, docData)

        setProfileImg(null)
    }

    // Send Password Reset Email
    const changePw = () => {
        sendPasswordResetEmail(auth, user.email)
            .then(() => {
                setIsEmailSent(true)

                setForm(initialState)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Delete User
    const deleteAcc = () => {
        deleteUser(auth.currentUser)
            .then(() => {
                // Frontend
                dispatch(resetUser())

                navigate('/')

                // Backend - delete user data in firestore
                const eraseUser = async () => {
                    await deleteDoc(docRef)
                }

                eraseUser()
            })
            .catch((error) => {
                console.log(error)
            })

        // Backend - delete user profile image file in firebase storage
        deleteObject(storageRef)
            .then()
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Update User Name
        if (form.name !== '' && form.name !== user.name) {
            const docData = {
                name: form.name,
            }

            updateDoc(docRef, docData)

            setIsUpdated(true)

            setName('')
        }

        // Update User Email Address
        if (form.email !== '' && form.email !== user.email) {
            updateEmail(auth.currentUser, form.email)
                .then(() => {
                    const docData = {
                        email: form.email,
                    }

                    updateDoc(docRef, docData)

                    setIsUpdated(true)

                    setForm(initialState)
                })
                .catch((error) => {
                    // Firebase error
                    switch (error.code) {
                        case 'auth/invalid-email':
                            setErrorMessage('Invalid email address.')
                            break

                        case 'auth/internal-error':
                            setErrorMessage('Internal error.')
                            break

                        default:
                            return ''
                    }
                })
        }

        // Custom error
        if (form.name === user.name && form.email === user.email) {
            setErrorMessage('Name and email currently in use.')
        } else if (form.name === user.name) {
            setErrorMessage('Name currently in use.')
        } else if (form.email === user.email) {
            setErrorMessage('Email currently in use.')
        }
    }

    return (
        <>
            <section className="sm:flex sm:items-center sm:justify-center portrait:sm:h-full landscape:desktop:h-full">
                <form
                    className="mx-auto w-full max-w-2xl rounded-lg shadow-md"
                    onSubmit={handleSubmit}
                >
                    <div className="h-full rounded-t-lg border-t-2 border-indigo-400 bg-opacity-5 p-5 dark:bg-tertiary lg:px-10">
                        <div className="inline-flex items-center space-x-4">
                            <div className="relative h-14 w-14 rounded-full md:h-16 md:w-16">
                                <img
                                    alt="User Icon"
                                    src={
                                        user.profileImg
                                            ? user.profileImg
                                            : defaultImg
                                    }
                                    className="h-14 w-14 rounded-full object-cover md:h-16 md:w-16"
                                />

                                <label>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute -bottom-1 -right-0 h-6 w-6 cursor-pointer rounded-full bg-gray-200 p-1 transition hover:bg-gray-300 dark:bg-secondary dark:text-white dark:hover:bg-tertiary"
                                        onClick={modalToggle}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                    </svg>
                                </label>

                                {modalOpen && (
                                    <ClickAwayListener
                                        onClickAway={modalToggle}
                                    >
                                        <div className="relative">
                                            <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-secondary">
                                                <label className="flex cursor-pointer rounded-t-lg px-4 py-3 text-base text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-100 dark:hover:bg-tertiary dark:hover:text-white">
                                                    Change profile pic
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            if (
                                                                e.target.files
                                                                    .length !==
                                                                0
                                                            ) {
                                                                setProfileImg(
                                                                    e.target
                                                                        .files[0]
                                                                )
                                                                setModalOpen(
                                                                    false
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </label>

                                                <span
                                                    className="flex cursor-pointer rounded-b-lg px-4 py-3 text-base text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-100 dark:hover:bg-tertiary dark:hover:text-white"
                                                    onClick={resetProfileImg}
                                                >
                                                    Remove profile pic
                                                </span>
                                            </div>
                                        </div>
                                    </ClickAwayListener>
                                )}
                            </div>

                            <div>
                                <div className="text-sm text-gray-600 dark:text-gray-300 md:text-base">
                                    {user.name}
                                </div>

                                <div className="text-xs font-light text-gray-600 dark:text-gray-300 md:text-sm">
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-b-lg bg-white dark:bg-secondary">
                        <div className="block w-full items-center justify-between border-b px-5 py-6 text-gray-500 dark:border-gray-700 dark:text-gray-300 lg:inline-flex lg:p-10 2xl:px-10">
                            <div className="text-sm md:text-base">Name</div>

                            <div className="mt-2 w-full lg:mt-0 lg:w-3/5">
                                <input
                                    type="text"
                                    id="user-info-name"
                                    name="name"
                                    value={form.name}
                                    className="border-transparent focus:border-transparent w-full flex-1 appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 dark:border-gray-600 dark:bg-tertiary dark:text-gray-300 md:text-base"
                                    placeholder="Name"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="block w-full items-center justify-between border-b px-5 py-6 text-gray-500 dark:border-gray-700 dark:text-gray-300 lg:inline-flex lg:p-10 2xl:px-10">
                            <div className="text-sm md:text-base">Email</div>

                            <div className="mt-2 w-full lg:mt-0 lg:w-3/5">
                                <input
                                    type="text"
                                    id="user-info-email"
                                    name="email"
                                    value={form.email}
                                    placeholder="Email"
                                    className="border-transparent focus:border-transparent w-full flex-1 appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 dark:border-gray-600 dark:bg-tertiary dark:text-gray-300 md:text-base"
                                    onChange={handleChange}
                                />

                                {errorMessage && (
                                    <label className="text-xs text-red-500">
                                        {errorMessage}
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="block w-full items-center justify-between border-b px-5 py-6 text-gray-500 dark:border-gray-700 dark:text-gray-300 lg:inline-flex lg:p-10 2xl:px-10">
                            <div className="text-sm md:text-base">
                                Reset password
                            </div>

                            <div className="mt-2 lg:mt-0">
                                <button
                                    type="button"
                                    className="w-full rounded-lg bg-pink-600 px-6 py-2 text-center text-sm font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-pink-200 md:text-base"
                                    onClick={changePw}
                                >
                                    Send Password Reset Email
                                </button>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-between border-b px-5 py-6 text-gray-500 dark:border-gray-700 dark:text-gray-300 lg:p-10 2xl:px-10">
                            <div className="text-sm md:text-base">
                                Delete account?
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="w-full rounded-lg bg-pink-600 px-6 py-2 text-center text-sm font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-pink-200 md:text-base"
                                    onClick={menuToggle}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-end px-5 py-6 text-gray-500 lg:p-10 2xl:px-10">
                            <button
                                type="submit"
                                disabled={!isAccountFormValid}
                                className="2xl:1/3 w-1/2 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200 disabled:cursor-auto disabled:opacity-40 md:text-base"
                            >
                                Save
                            </button>
                        </div>
                    </div>

                    {isUpdated && (
                        <ClickAwayListener onClickAway={updateToggle}>
                            <div className="absolute left-1/2 top-1/2 m-auto w-72 -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white p-4 shadow-lg dark:bg-tertiary">
                                <div className="h-full w-full text-center">
                                    <div className="flex h-full flex-col justify-between">
                                        <svg
                                            className="m-auto mt-4 h-12 w-12 text-green-500"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            ></path>
                                        </svg>

                                        <div className="p-2 text-sm text-gray-600 dark:text-gray-100 md:text-base">
                                            Information has been updated.
                                        </div>

                                        <div className="mt-8 flex w-full items-center justify-between gap-4">
                                            <button
                                                type="button"
                                                className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200 md:text-base"
                                                onClick={updateToggle}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ClickAwayListener>
                    )}

                    {isEmailSent && (
                        <ClickAwayListener onClickAway={sendEmailToggle}>
                            <div className="absolute left-1/2 top-1/2 m-auto w-72 -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white p-4 shadow-lg dark:bg-tertiary">
                                <div className="h-full w-full text-center">
                                    <div className="flex h-full flex-col justify-between">
                                        <svg
                                            className="m-auto mt-4 h-12 w-12 text-green-500"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            ></path>
                                        </svg>

                                        <div className="p-2 text-sm text-gray-600 dark:text-gray-100 md:text-base">
                                            Reset password email has been sent
                                            to your email address ({user.email}
                                            ).
                                        </div>

                                        <div className="mt-8 flex w-full items-center justify-between gap-4">
                                            <button
                                                type="button"
                                                className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200 md:text-base"
                                                onClick={sendEmailToggle}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ClickAwayListener>
                    )}

                    {menuOpen && (
                        <ClickAwayListener onClickAway={menuToggle}>
                            <div className="absolute left-1/2 top-1/2 m-auto w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white p-4 shadow-lg dark:bg-tertiary">
                                <div className="h-full w-full text-center">
                                    <div className="flex h-full flex-col justify-between">
                                        <svg
                                            width="40"
                                            height="40"
                                            className="m-auto mt-4 h-12 w-12 text-indigo-500"
                                            fill="currentColor"
                                            viewBox="0 0 1792 1792"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"></path>
                                        </svg>

                                        <div className="mt-4 text-lg font-bold text-gray-800 dark:text-gray-200 md:text-xl">
                                            Confirmation
                                        </div>

                                        <div className="px-6 py-2 text-xs text-gray-600 dark:text-gray-400 md:text-sm">
                                            Are you sure you want to delete this
                                            account?
                                        </div>

                                        <div className="mt-8 flex w-full items-center justify-between gap-4">
                                            <button
                                                type="button"
                                                className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200 md:text-base"
                                                onClick={deleteAcc}
                                            >
                                                Delete
                                            </button>

                                            <button
                                                type="button"
                                                className="w-full rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-indigo-500 shadow-md transition duration-200 ease-in hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200 dark:hover:bg-gray-300 md:text-base"
                                                onClick={menuToggle}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ClickAwayListener>
                    )}
                </form>
            </section>
        </>
    )
}

export default AccountPage
