import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'

import useForm from '../hooks/form'

const SignInPage = () => {
    const navigate = useNavigate()

    // Custom Hook
    const {
        form,
        errorMessage,
        setErrorMessage,
        handleChange,
        isSignInFormValid,
    } = useForm()

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true)

        const auth = getAuth()

        signInWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredential) => {
                // Signed in
                navigate('/dashboard')
            })
            .catch((error) => {
                // Sign in fail
                setIsLoading(false)

                // Firebase error
                switch (error.code) {
                    case 'auth/invalid-email':
                        setErrorMessage('Invalid email address.')
                        break

                    case 'auth/wrong-password':
                        setErrorMessage('Incorrect password.')
                        break

                    case 'auth/user-not-found':
                        setErrorMessage('User not found.')
                        break

                    case 'auth/too-many-requests':
                        setErrorMessage(
                            'Too many attempts. Please try again later.'
                        )
                        break

                    case 'auth/internal-error':
                        setErrorMessage('Internal error.')
                        break

                    default:
                        return ''
                }
            })
    }

    return (
        <>
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-secondary">
                <div className="m-4 w-full max-w-sm rounded-md bg-white p-6 shadow-md dark:bg-tertiary">
                    <div className="item-center flex flex-col justify-center space-y-4 text-center text-gray-800 dark:text-white">
                        <div className="text-3xl font-semibold">HODL</div>

                        <span className="text-base">Sign In</span>
                    </div>

                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="text-sm text-gray-700 dark:text-gray-200"
                            >
                                Email
                            </label>

                            <input
                                type="text"
                                name="email"
                                value={form.email}
                                className="mt-2 w-full rounded-md border px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-tertiary dark:text-gray-300"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="text-sm text-gray-700 dark:text-gray-200"
                            >
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                className="mt-2 w-full rounded-md border px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-tertiary dark:text-gray-300"
                                onChange={handleChange}
                            />

                            {errorMessage && (
                                <label className="text-xs text-red-500">
                                    {errorMessage}
                                </label>
                            )}
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={!isSignInFormValid}
                                className="flex w-full transform items-center justify-center rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 disabled:cursor-auto disabled:bg-gray-300 disabled:hover:bg-gray-300 dark:bg-gray-500 dark:disabled:border dark:disabled:border-gray-700 dark:disabled:bg-tertiary dark:disabled:text-gray-600 dark:disabled:hover:bg-tertiary"
                            >
                                <span>Login</span>

                                {isLoading && (
                                    <svg
                                        className="-mr-1 ml-2 h-5 w-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 items-center justify-center space-x-1 text-center text-xs sm:flex">
                        <div className="font-light text-gray-500 dark:text-gray-400">
                            Don't have an account?
                        </div>

                        <Link
                            to="/signup"
                            className="font-medium text-gray-700 hover:underline dark:text-gray-200"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInPage
