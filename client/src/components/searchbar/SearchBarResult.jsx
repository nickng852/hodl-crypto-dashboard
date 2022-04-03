import { Link } from "react-router-dom";

const SearchBarResult = ({ result, id, icon, name, symbol, setSearch }) => {
  const handleClickAway = () => {
    setSearch("");

    const input = document.getElementById("search");
    input.value = "";
  };

  return (
    <>
      <Link key={id} to={`/coin/${id}`} onClick={handleClickAway}>
        <div className="flex justify-between px-6 py-3 hover:bg-gray-100 dark:hover:bg-tertiary">
          <div>
            <div className="font-medium text-gray-700 dark:text-gray-100">
              {name}
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {symbol}
            </div>
          </div>
          <div className="flex items-center">
            <img src={icon} alt={crypto} className="rounded-full w-7 h-7" />
          </div>
        </div>
      </Link>
    </>
  );
};

export default SearchBarResult;