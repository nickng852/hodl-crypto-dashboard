import { useSelector } from "react-redux";
import { selectCoin } from "../../features/coins/coinsSlice";

import parse from "html-react-parser";

const CoinDesc = () => {
  const coin = useSelector(selectCoin);

  const description = coin?.description;

  return (
    <>
      <div className="px-10 py-6 text-justify bg-white opacity-50 rounded-2xl dark:text-gray-100 dark:bg-secondary">
        {parse(description)}
      </div>
    </>
  );
};

export default CoinDesc;
