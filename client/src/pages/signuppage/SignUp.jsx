import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Custom Hook
import useForm from "../../hooks/form";

// Firebase
import { db } from "../../firebase/firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Custom Hook
  const {
    form,
    errorMessage,
    setErrorMessage,
    handleChange,
    isSignUpFormValid,
  } = useForm();

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in

        // Add user data to Firestore
        const user = userCredential.user;

        const docData = {
          uid: user.uid,
          createDate: Timestamp.fromDate(new Date()),
          name: form.name,
          email: form.email,
          profileImg: null,
          watchlist: [],
        };

        setDoc(doc(db, "users", user.uid), docData);

        navigate("/");
      })
      .catch((error) => {
        // Sign in fail
        setIsLoading(false);

        // Firebase error
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessage("Invalid email address.");
            break;

          case "auth/weak-password":
            setErrorMessage("Password should be at least 6 characters.");
            break;

          case "auth/email-already-in-use":
            setErrorMessage("Email is already in use.");
            break;

          case "auth/internal-error":
            setErrorMessage("Internal error.");
            break;

          default:
            return "";
        }
      });
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-secondary">
        <div className="w-full max-w-sm p-6 m-4 bg-white rounded-md shadow-md dark:bg-tertiary">
          <div className="flex flex-col justify-center space-y-4 text-center text-gray-800 item-center dark:text-white">
            <div className="text-3xl font-semibold">HODL</div>

            <span className="text-md">Sign Up</span>
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="text-sm text-gray-700 dark:text-gray-200"
              >
                Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md dark:bg-tertiary dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
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
                className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md dark:bg-tertiary dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
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
                className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-md dark:bg-tertiary dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
              />

              {errorMessage && (
                <label className="text-xs text-red-500">{errorMessage}</label>
              )}
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={!isSignUpFormValid}
                className="flex items-center justify-center w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md dark:bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-auto disabled:hover:bg-gray-300 dark:disabled:bg-tertiary dark:disabled:border-gray-700 dark:disabled:border dark:disabled:hover:bg-tertiary dark:disabled:text-gray-600"
              >
                <span>Sign Up</span>

                {isLoading && (
                  <svg
                    className="w-5 h-5 ml-2 -mr-1 text-white animate-spin"
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

          <div className="items-center justify-center mt-6 space-x-1 text-xs text-center sm:flex">
            <div className="font-light text-gray-500 dark:text-gray-400">
              Already have an account?
            </div>

            <Link
              to="/"
              className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
