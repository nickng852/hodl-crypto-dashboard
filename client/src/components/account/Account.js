import React from "react";
import { Link, useHistory } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth";

const Account = ({ setUser, setIsLogged }) => {
  let history = useHistory();

  const deleteAcc = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    deleteUser(currentUser)
      .then(() => {
        setUser("");
        setIsLogged(false);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section className="h-screen bg-gray-100 bg-opacity-50">
        <form className="container max-w-2xl mx-auto shadow-md md:w-3/4">
          <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <Link to="#" className="relative block">
                  <img
                    alt=""
                    src=""
                    className="object-cover w-16 h-16 mx-auto rounded-full"
                  />
                </Link>
                <h1 className="text-gray-600">Charlie</h1>
              </div>
            </div>
          </div>
          <div className="space-y-6 bg-white">
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">Account</h2>
              <div className="max-w-sm mx-auto md:w-2/3">
                <div className="relative ">
                  <input
                    type="text"
                    id="user-info-email"
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">Personal info</h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div>
                  <div className="relative ">
                    <input
                      type="text"
                      id="user-info-name"
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative ">
                    <input
                      type="text"
                      id="user-info-phone"
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-4/12">Change password</h2>
              <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
                <div className="relative ">
                  <input
                    type="text"
                    id="user-info-password"
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="text-center md:w-3/12 md:pl-6">
                <button
                  type="button"
                  className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-pink-600 rounded-lg shadow-md hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  Change
                </button>
              </div>
            </div>
            <hr />
            <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-4/12">Delete account?</h2>
              <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex"></div>
              <div className="text-center md:w-3/12 md:pl-6">
                <button
                  type="button"
                  className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-pink-600 rounded-lg shadow-md hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  onClick={deleteAcc}
                >
                  Delete
                </button>
              </div>
            </div>
            <hr />
            <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
              <button
                type="submit"
                className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Account;
