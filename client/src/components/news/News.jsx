import { useSelector } from "react-redux";
import { selectNews } from "../../features/news/newsSlice";

import moment from "moment";

import defaultImg from "../../assets/images/404-01-scaled.jpg";

const News = () => {
  const news = useSelector(selectNews);

  return (
    <>
      <div className="grid gap-y-10">
        {news.map((result, index) => {
          const newsImage = result.urlToImage ? result.urlToImage : defaultImg;
          const newsTitle = result.title;
          const newsPublishDate = moment(result.publishedAt)
            .startOf("ss")
            .fromNow();

          return (
            <a href={result.url} target="_blank" rel="noreferrer" key={index}>
              <div className="grid grid-cols-12 transition-shadow duration-200 bg-white shadow dark:bg-secondary rounded-xl hover:shadow-lg">
                <img
                  src={newsImage}
                  alt={newsTitle}
                  className="object-cover w-full h-full col-span-3 bg-center 2xl:h-40 md:rounded-xl rounded-t-xl"
                />

                <div className="flex flex-col justify-between col-span-9">
                  <div className="p-5 md:p-6 xl:p-10 2xl:p-4">
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
      </div>
    </>
  );
};

export default News;
