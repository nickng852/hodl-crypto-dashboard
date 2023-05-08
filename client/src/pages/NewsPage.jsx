import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../components/loader/Spinner.jsx";
import NewsCard from "../components/news/NewsCard.jsx";
import NewsCardPagination from "../components/news/NewsCardPagination";
import { selectKeyword, setNews } from "../features/news/newsSlice";
import { useGetNewsQuery } from "../services/cryptoApi";

const NewsPage = () => {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const keyword = useSelector(selectKeyword);

  // News API - GET news
  const { data: getNewsApi, isLoading: isNewsLoading } = useGetNewsQuery({
    keyword: keyword,
    page: page,
    pageSize: 20,
  });

  dispatch(setNews(getNewsApi?.articles));

  return (
    <>
      <section className="flex flex-col min-h-full space-y-4 2xl:space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-xl text-gray-500 cursor-default dark:text-gray-100 font-header">
            News
          </h1>

          <NewsCardPagination page={page} setPage={setPage} />
        </header>

        <div className="flex flex-grow">
          {isNewsLoading && (
            <div className="flex items-center justify-center flex-1">
              <Spinner />
            </div>
          )}

          {!isNewsLoading && (
            <div className="grid grid-cols-1 gap-6 xl:gap-12 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 2xl:gap-16 xl:gap-y-10">
              <NewsCard />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default NewsPage;
