import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  selectToken,
  selectUser,
  setWatchList,
} from "../../features/auth/authSlice";

// Firebase
import { db } from "../../firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";

const WatchListModalResult = ({
  id,
  icon,
  name,
  symbol,
  setWatchListSearch,
}) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  // Add individual item to watchlist
  const addItem = () => {
    // block duplicate insert

    const isDuplicated = user.watchlist.includes(id);

    if (!isDuplicated) {
      dispatch(
        setWatchList((prev) => ({
          ...prev,
          watchlist: [...user.watchlist, id],
        }))
      );

      // Add watchlist data to Firestore
      const docData = {
        watchlist: [...user.watchlist, id],
      };

      updateDoc(doc(db, "users", token.uid), docData);

      setWatchListSearch("");
    }
  };

  return (
    <>
      <Link to="#" key={id} className="cursor-default" onClick={addItem}>
        <div className="flex justify-between p-4 xl:hover:bg-gray-50 xl:dark:hover:bg-tertiary 2xl:px-6">
          <div className="w-full">
            <div className="text-sm font-medium text-gray-800 2xl:font-medium dark:text-gray-100">
              {name}
            </div>

            <div className="text-xs text-gray-500 2xl:text-sm dark:text-gray-400">
              {symbol}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={icon}
              alt={name}
              className="w-5 h-5 rounded-full 2xl:w-7 2xl:h-7"
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default WatchListModalResult;
