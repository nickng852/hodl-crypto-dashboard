import { useSelector, useDispatch } from "react-redux";
import { selectKeyword, setNews } from "../../features/news/newsSlice";

import Spinner from "../../components/loader/Spinner.jsx";
import NewsList from "./NewsList.jsx";

import { useGetNewsQuery } from "../../services/cryptoApi";

const NewsCollection = () => {
  const dispatch = useDispatch();
  const keyword = useSelector(selectKeyword);

  // News API - GET news
  const { data: getNewsApi, isFetching: isNewsFetching } = useGetNewsQuery({
    keyword: keyword,
    pageSize: "20",
  });

  dispatch(setNews(getNewsApi?.articles));

  return (
    <>
      {isNewsFetching && (
        <>
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        </>
      )}

      {!isNewsFetching && (
        <>
          <div className="grid grid-cols-1 p-24 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 lg:gap-12 place-items-center gap-y-10">
            <NewsList />
          </div>
        </>
      )}
    </>
  );
};

export default NewsCollection;
