import { useSelector } from "react-redux";
import { selectNews } from "../../features/news/newsSlice";

import moment from "moment";

import defaultImg from "../../assets/images/404-error.jpg";

const NewsList = () => {
  const news = useSelector(selectNews);

  return (
    <>
      <main className="flex flex-col justify-between overflow-y-scroll gap-y-10 2xl:h-[35rem] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full dark:scrollbar-thumb-tertiary dark:scrollbar-track-secondary">
        {news?.map((result, index) => {
          const newsImage = result.urlToImage ? result.urlToImage : defaultImg;
          const newsTitle = result.title;
          const newsPublishDate = moment(result.publishedAt)
            .startOf("ss")
            .fromNow();

          return (
            <a href={result.url} target="_blank" rel="noreferrer" key={index}>
              <div className="grid min-h-[10rem] grid-cols-12 transition-shadow duration-200 bg-white shadow dark:bg-secondary rounded-xl hover:shadow-lg">
                <img
                  src={newsImage}
                  alt={newsTitle}
                  className="object-cover w-full min-h-[10rem] h-full col-span-4 bg-center lg:col-span-3 xl:col-span-4 2xl:col-span-3 md:rounded-xl rounded-t-xl"
                />

                <div className="flex flex-col justify-between col-span-8 lg:col-span-9 xl:col-span-8 2xl:col-span-9">
                  <div className="p-5 md:p-6 lg:p-8 2xl:p-4">
                    <div className="font-semibold text-gray-900 dark:text-gray-100 md:text-base xl:text-lg 2xl:text-base">
                      {newsTitle}
                    </div>

                    <div className="mt-2 font-light text-gray-600 md:text-sm xl:text-base dark:text-gray-300 2xl:text-sm">
                      {newsPublishDate}
                    </div>
                  </div>

                  <div className="px-5 py-4 xl:p-8 lg:p-6 2xl:p-4">
                    <div className="text-xs font-light text-right text-gray-600 md:text-sm dark:text-gray-300 xl:text-base 2xl:text-sm">
                      From <strong>{result.source.name}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </main>
    </>
  );
};

export default NewsList;
