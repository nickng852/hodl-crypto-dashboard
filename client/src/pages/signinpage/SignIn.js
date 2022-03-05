import { Link, useHistory } from "react-router-dom";

// Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = ({
  initialState,
  form,
  setForm,
  isLoading,
  setIsLoading,
  errorMessage,
  setErrorMessage,
  setToken,
  setIsLogged,
}) => {
  let history = useHistory();

  const signIn = () => {
    setIsLoading(true);

    const auth = getAuth();

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in
        setToken(userCredential.user);
        setIsLogged(true);
        setForm(initialState);
        setErrorMessage("");
        setIsLoading(false);
        history.push("/dashboard");
      })
      .catch((err) => {
        setIsLoading(false);

        // Firebase error
        switch (err.code) {
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password.";
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
        if (form.email === "" && form.password === "") {
          errorMessage = "Please enter email address and password.";
        } else if (form.email === "") {
          errorMessage = "Please enter email address.";
        } else if (form.password === "") {
          errorMessage = "Please enter password.";
        }

        setErrorMessage(errorMessage);
      });
  };

  const signUp = () => {
    setIsLoading(false);
    setForm(initialState);
    setErrorMessage("");
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
        <div className="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <div className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
            Sign In
          </div>

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
                value={form.email}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, email: e.target.value }));
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
                value={form.password}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, password: e.target.value }));
                }}
              />
              {errorMessage && (
                <label className="text-xs text-red-500 ">{errorMessage}</label>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="flex items-center justify-center w-full px-4 py-2 tracking-wide text-center text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                onClick={signIn}
              >
                <span>Login</span>

                {isLoading && errorMessage === "" && (
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

          <div className="mt-8 text-xs font-light text-center text-gray-400">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-1 font-medium text-gray-700 dark:text-gray-200 hover:underline"
              onClick={signUp}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
