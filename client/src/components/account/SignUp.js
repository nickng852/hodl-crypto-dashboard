import React from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({
  setUser,
  email,
  setEmail,
  password,
  setPassword,
  errorMessage,
  setErrorMessage,
}) => {
  const signUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        setUser(userCredential.user);
        console.log("Account created.");
        setEmail("");
        setPassword("");
        setErrorMessage("");
      })
      .catch((err) => {
        console.log(err.message);
        // Firebase error
        switch (err.code) {
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/weak-password":
            errorMessage = "Password should be at least 6 characters.";
            break;
          case "auth/email-already-in-use":
            errorMessage = "Email is already in use.";
            break;
          case "auth/internal-error":
            errorMessage = "Internal error.";
            break;
          default:
            return "";
        }

        // Custom error
        if (email === "" && password === "") {
          errorMessage = "Please enter email address and password.";
        } else if (email === "") {
          errorMessage = "Please enter email address.";
        } else if (password === "") {
          errorMessage = "Please enter password.";
        }

        setErrorMessage(errorMessage);
      });
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
            Sign Up
          </h1>

          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Email
              </label>
              <input
                type="text"
                value={email}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {errorMessage ? (
                <label className="text-xs text-red-500 ">{errorMessage}</label>
              ) : null}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                onClick={signUp}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            Already have an account?
            <Link
              to="/"
              className="ml-1 font-medium text-gray-700 dark:text-gray-200 hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
