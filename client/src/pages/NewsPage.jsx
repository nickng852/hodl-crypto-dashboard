import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectKeyword, selectNews, setNews } from "../features/news/newsSlice";

import Spinner from "../components/loader/Spinner.jsx";
import NewsCard from "../components/news/NewsCard.jsx";

import { useGetNewsQuery } from "../services/cryptoApi";

const NewsPage = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const keyword = useSelector(selectKeyword);
  const news = useSelector(selectNews);

  // News API - GET news
  const { data: getNewsApi, isFetching: isNewsFetching } = useGetNewsQuery({
    keyword: keyword,
    page: page,
    pageSize: 20,
  });

  dispatch(setNews(getNewsApi?.articles));

  /*   const fetchMore = () => {
    setPage((prev) => prev + 1);
  }; */

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
          <section className="space-y-4">
            <header className="flex items-center">
              <h1 className="text-xl text-gray-500 cursor-default dark:text-gray-100 font-header">
                News
              </h1>
            </header>

            {/*             <button type="button" onClick={fetchMore}>
              Fetch More
            </button> */}

            <div className="grid grid-cols-1 gap-6 xl:gap-12 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 2xl:gap-8 xl: gap-y-10">
              <NewsCard />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default NewsPage;
