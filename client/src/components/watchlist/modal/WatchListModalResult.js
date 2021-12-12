import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";

const WatchListModalResult = ({
  token,
  user,
  setUser,
  result,
  id,
  name,
  symbol,
  icon,
  setWatchListSearch,
}) => {
  // Add individual item to watchlist
  const addItem = () => {
    // block duplicate insert
    if (!user.watchlist.includes(result)) {
      setUser((prev) => ({ ...prev, watchlist: [...user.watchlist, result] }));
    }

    // Add watchlist data to Firestore
    const docData = {
      watchlist: [...user.watchlist, result],
    };

    updateDoc(doc(db, "users", token.uid), docData);

    setWatchListSearch("");
  };

  return (
    <>
      <Link key={id} to="#" className="cursor-default" onClick={addItem}>
        <div className="flex justify-between px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-600">
          <div className="w-full">
            <p className="font-medium text-gray-800 dark:text-gray-100">
              {name}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">{symbol}</p>
          </div>

          <div className="flex items-center justify-center ">
            <img src={icon} alt={name} className="rounded-full w-7 h-7" />
          </div>
        </div>
      </Link>
    </>
  );
};

export default WatchListModalResult;
