import React from "react";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = ({
  isLogged,
  setIsLogged,
  setUser,
  email,
  setEmail,
  password,
  setPassword,
  errorMessage,
  setErrorMessage,
}) => {
  let history = useHistory();

  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        setIsLogged(true);
        history.push("/dashboard");
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
          case "auth/wrong-password":
            errorMessage = "Wrong password.";
            break;
          case "auth/user-not-found":
            errorMessage = "User not found.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many attempts. Please try again later.";
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
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
            Sign In
          </h1>

          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div>
              <label
                htmlFor="username"
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
                to="/dashboard"
                className="w-full px-4 py-2 tracking-wide text-center text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                onClick={signIn}
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-1 font-medium text-gray-700 dark:text-gray-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
