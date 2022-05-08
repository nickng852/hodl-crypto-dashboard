import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  selectToken,
  selectUser,
  resetUser,
} from "../../features/auth/authSlice";

// Custom Hook
import useForm from "../../hooks/form";

import ClickAwayListener from "react-click-away-listener";

import defaultImg from "../../assets/images/blank-profile-picture.png";

// Firebase
import { db } from "../../firebase/firebase.config";
import {
  getAuth,
  updateEmail,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const Account = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false); // whether "Name" or "Email" has been updated
  const [isEmailSent, setIsEmailSent] = useState(false); // whether Password Reset Email has been sent

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

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
  } = useForm();

  let navigate = useNavigate();

  const modalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const updateToggle = () => {
    setIsUpdated(!isUpdated);
  };

  const sendEmailToggle = () => {
    setIsEmailSent(!isEmailSent);
  };

  // ----- Firebase -----

  // Authentication
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Firestore Database
  const docRef = doc(db, "users", token.uid);

  // Storage
  const storage = getStorage();
  const storageRef = ref(storage, "userProfileImg/" + user.uid);

  // Update User Profile Image (Instantly)
  useEffect(() => {
    if (profileImg !== null) {
      uploadBytes(storageRef, profileImg).then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            const docData = {
              profileImg: url,
            };

            updateDoc(docRef, docData);

            setProfileImg(null);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, [profileImg, storageRef, docRef]);

  // Send Password Reset Email
  const changePw = () => {
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        setIsEmailSent(true);

        setForm(initialState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete User
  const deleteAcc = () => {
    deleteUser(currentUser)
      .then(() => {
        // Frontend
        dispatch(resetUser());

        navigate("/");

        // Backend - delete user data in firestore
        const eraseUser = async () => {
          await deleteDoc(docRef);
        };

        eraseUser();
      })
      .catch((error) => {
        console.log(error);
      });

    // Backend - delete user profile image file in firebase storage
    deleteObject(storageRef)
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update User Name
    if (form.name !== "" && form.name !== user.name) {
      const docData = {
        name: form.name,
      };

      updateDoc(docRef, docData);

      setIsUpdated(true);

      setName("");
    }

    // Update User Email Address
    if (form.email !== "" && form.email !== user.email) {
      updateEmail(currentUser, form.email)
        .then(() => {
          const docData = {
            email: form.email,
          };

          updateDoc(docRef, docData);

          setIsUpdated(true);

          setForm(initialState);
        })
        .catch((error) => {
          // Firebase error
          switch (error.code) {
            case "auth/invalid-email":
              setErrorMessage("Invalid email address.");
              break;

            case "auth/internal-error":
              setErrorMessage("Internal error.");
              break;

            default:
              return "";
          }
        });
    }

    // Custom error
    if (form.name === user.name && form.email === user.email) {
      setErrorMessage("Name and email currently in use.");
    } else if (form.name === user.name) {
      setErrorMessage("Name currently in use.");
    } else if (form.email === user.email) {
      setErrorMessage("Email currently in use.");
    }
  };

  return (
    <>
      <section className="w-full h-full overflow-auto sm:flex sm:items-center sm:justify-center">
        <div className="container p-4">
          <form
            className="max-w-2xl mx-auto rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            <div className="px-5 py-6 border-t-2 border-indigo-400 rounded-t-lg 2xl:px-10 dark:bg-tertiary bg-opacity-5">
              <div className="inline-flex items-center space-x-4">
                <label className="relative w-16 h-16 overflow-hidden rounded-full">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files.length !== 0) {
                        setProfileImg(e.target.files[0]);
                      }
                    }}
                  />

                  <img
                    alt="User Icon"
                    src={user.profileImg ? user.profileImg : defaultImg}
                    className="object-cover w-16 h-16"
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute w-24 h-24 p-8 transform -translate-x-1/2 -translate-y-1/2 opacity-0 cursor-pointer hover:bg-gray-200 hover:opacity-70 top-1/2 left-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </label>

                <div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {user.name}
                  </div>

                  <div className="text-sm font-light text-gray-600 dark:text-gray-300">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-b-lg dark:bg-secondary">
              <div className="items-center justify-between block w-full px-5 py-6 text-gray-500 border-b 2xl:px-10 lg:p-10 lg:inline-flex dark:text-gray-300 dark:border-gray-700">
                <div>Name</div>

                <div className="w-full mt-2 lg:w-3/5 lg:mt-0">
                  <input
                    type="text"
                    id="user-info-name"
                    name="name"
                    value={form.name}
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none dark:text-gray-300 dark:border-gray-600 dark:bg-tertiary focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Name"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="items-center justify-between block w-full px-5 py-6 text-gray-500 border-b 2xl:px-10 lg:p-10 lg:inline-flex dark:text-gray-300 dark:border-gray-700">
                <div>Email</div>

                <div className="w-full mt-2 lg:w-3/5 lg:mt-0">
                  <input
                    type="text"
                    id="user-info-email"
                    name="email"
                    value={form.email}
                    placeholder="Email"
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none dark:text-gray-300 dark:border-gray-600 dark:bg-tertiary focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    onChange={handleChange}
                  />

                  {errorMessage && (
                    <label className="text-xs text-red-500">
                      {errorMessage}
                    </label>
                  )}
                </div>
              </div>

              <div className="items-center justify-between block w-full px-5 py-6 text-gray-500 border-b 2xl:px-10 lg:p-10 dark:text-gray-300 dark:border-gray-700 lg:inline-flex">
                <div>Reset password</div>

                <div className="mt-2 lg:mt-0">
                  <button
                    type="button"
                    className="w-full px-6 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-pink-600 rounded-lg shadow-md hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    onClick={changePw}
                  >
                    Send Password Reset Email
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between w-full px-5 py-6 text-gray-500 border-b 2xl:px-10 lg:p-10 dark:text-gray-300 dark:border-gray-700">
                <div>Delete account?</div>

                <div>
                  <button
                    type="button"
                    className="w-full px-6 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-pink-600 rounded-lg shadow-md hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    onClick={modalToggle}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end w-full px-5 py-6 text-gray-500 2xl:px-10 lg:p-10">
                <button
                  type="submit"
                  disabled={!isAccountFormValid}
                  className="w-1/2 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-600 rounded-lg shadow-md 2xl:1/3 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-auto"
                >
                  Save
                </button>
              </div>
            </div>

            {isUpdated && (
              <ClickAwayListener onClickAway={updateToggle}>
                <div className="absolute p-4 m-auto transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg w-72 top-1/2 left-1/2 rounded-2xl dark:bg-tertiary">
                  <div className="w-full h-full text-center">
                    <div className="flex flex-col justify-between h-full">
                      <svg
                        className="w-12 h-12 m-auto mt-4 text-green-500"
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

                      <div className="p-2 text-base text-gray-600 dark:text-gray-100">
                        Information has been updated.
                      </div>

                      <div className="flex items-center justify-between w-full gap-4 mt-8">
                        <button
                          type="button"
                          className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
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
                <div className="absolute p-4 m-auto transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg w-72 top-1/2 left-1/2 rounded-2xl dark:bg-tertiary">
                  <div className="w-full h-full text-center">
                    <div className="flex flex-col justify-between h-full">
                      <svg
                        className="w-12 h-12 m-auto mt-4 text-green-500"
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

                      <div className="p-2 text-base text-gray-600 dark:text-gray-100">
                        Reset password email has been sent to your email address
                        ({user.email}).
                      </div>

                      <div className="flex items-center justify-between w-full gap-4 mt-8">
                        <button
                          type="button"
                          className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
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

            {modalOpen && (
              <ClickAwayListener onClickAway={modalToggle}>
                <div className="absolute w-64 p-4 m-auto transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg top-1/2 left-1/2 rounded-2xl dark:bg-tertiary">
                  <div className="w-full h-full text-center">
                    <div className="flex flex-col justify-between h-full">
                      <svg
                        width="40"
                        height="40"
                        className="w-12 h-12 m-auto mt-4 text-indigo-500"
                        fill="currentColor"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z"></path>
                      </svg>

                      <div className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
                        Confirmation
                      </div>

                      <div className="px-6 py-2 text-xs text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete this account?
                      </div>

                      <div className="flex items-center justify-between w-full gap-4 mt-8">
                        <button
                          type="button"
                          className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                          onClick={deleteAcc}
                        >
                          Delete
                        </button>

                        <button
                          type="button"
                          className="w-full px-4 py-2 text-base font-semibold text-center text-indigo-500 transition duration-200 ease-in bg-white rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-300 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                          onClick={modalToggle}
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
        </div>
      </section>
    </>
  );
};

export default Account;
