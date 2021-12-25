import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";
import defaultProfileImg from "../../assets/images/blank-profile-picture.png";

// Firebase
import { db } from "../../firebase/firebase.config";
import { getAuth, updatePassword, deleteUser } from "firebase/auth";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Account = ({
  initialState,
  form,
  setForm,
  token,
  setToken,
  user,
  setUser,
  setIsLogged,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(null);

  let history = useHistory();

  const modalToggle = () => {
    setModalOpen(!modalOpen);
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

  const changePw = () => {
    updatePassword(currentUser, form.password)
      .then(() => {
        setForm(initialState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAcc = () => {
    deleteUser(currentUser)
      .then(() => {
        // Frontend
        setToken("");
        setUser("");
        setIsLogged(false);
        history.push("/");

        // Backend - delete user data in firestore
        const eraseUser = async () => {
          await deleteDoc(docRef);
        };

        eraseUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImg = () => {
    // Backend - upload image to firestore
    if (profileImg !== null) {
      uploadBytes(storageRef, profileImg).then((snapshot) => {
        getDownloadURL(storageRef)
          .then((url) => {
            const docData = {
              profileImg: url,
            };

            updateDoc(docRef, docData);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  };

  return (
    <>
      <section className="h-full bg-gray-100 bg-opacity-50">
        <div className="flex justify-center">
          <form className="relative max-w-2xl m-24 rounded-lg shadow-md md:w-3/4">
            <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-t-lg bg-opacity-5">
              <div className="max-w-sm mx-auto md:w-full md:mx-0">
                <div className="inline-flex items-center space-x-4">
                  <Link to="#" className="relative block">
                    <img
                      alt=""
                      src={
                        user.profileImg ? user.profileImg : defaultProfileImg
                      }
                      className="object-cover w-16 h-16 mx-auto rounded-full"
                    />
                  </Link>
                  <div className="text-gray-600">{user.name}</div>
                </div>
              </div>
            </div>
            <div className="space-y-6 bg-white rounded-b-lg">
              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <div className="max-w-sm mx-auto md:w-1/3">Name</div>
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
                </div>
              </div>
              <hr />
              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <div className="max-w-sm mx-auto md:w-1/3">Email</div>
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
              <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <div className="max-w-sm mx-auto md:w-4/12">
                  Change password
                </div>
                <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
                  <div className="relative ">
                    <input
                      type="password"
                      id="user-info-password"
                      className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Password"
                      onChange={(e) => {
                        setForm((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="text-center md:w-3/12 md:pl-6">
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-pink-600 rounded-lg shadow-md hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    onClick={changePw}
                  >
                    Change
                  </button>
                </div>
              </div>
              <hr />
              <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <div className="max-w-sm mx-auto md:w-4/12">
                  Delete account?
                </div>
                <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex"></div>
                <div className="text-center md:w-3/12 md:pl-6">
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-pink-600 rounded-lg shadow-md hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    onClick={modalToggle}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <hr />
              <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                <button
                  type="button"
                  className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  onClick={uploadImg}
                >
                  Save
                </button>

                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files.length !== 0) {
                      setProfileImg(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>

            {modalOpen && (
              <ClickAwayListener onClickAway={modalToggle}>
                <div className="absolute w-64 p-4 m-auto transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg top-1/2 left-1/2 rounded-2xl dark:bg-gray-800">
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
                      <p className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
                        Confirmation
                      </p>
                      <p className="px-6 py-2 text-xs text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete this account?
                      </p>
                      <div className="flex items-center justify-between w-full gap-4 mt-8">
                        <button
                          type="button"
                          className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                          onClick={deleteAcc}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="w-full px-4 py-2 text-base font-semibold text-center text-white text-indigo-500 transition duration-200 ease-in bg-white rounded-lg shadow-md hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
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
