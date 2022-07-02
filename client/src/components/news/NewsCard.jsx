import { useSelector } from "react-redux";
import { selectNews } from "../../features/news/newsSlice";

import defaultImg from "../../assets/images/404-error.jpg";

const NewsCard = () => {
  const news = useSelector(selectNews);

  const showDefaultImg = (e) => {
    e.target.src = defaultImg;
  };

  return (
    <>
      {news?.map((result, index) => {
        const newsImage = result.urlToImage ? result.urlToImage : defaultImg;
        const newsUrl = result.url;
        const newsSource = result.source.name;
        const newsTitle = result.title;
        const newsDesc = result.description;

        return (
          <main
            key={index}
            className="relative p-4 bg-white w-116 xl:p-6 rounded-xl dark:bg-secondary"
          >
            <a href={newsUrl} target="_blank" rel="noreferrer">
              <img
                src={newsImage}
                alt={newsTitle}
                onError={showDefaultImg}
                className="object-cover w-full bg-center h-60 rounded-xl md:h-96 sm:h-80 lg:h-64"
              />

              <div className="px-2 py-5 space-y-3">
                {newsSource && (
                  <>
                    <div className="flex space-x-3">
                      <span className="px-2 py-1 text-xs font-medium leading-5 text-blue-500 truncate rounded-md bg-blue-50">
                        {newsSource}
                      </span>
                    </div>
                  </>
                )}

                <div className="text-sm text-gray-600 line-clamp-2 md:text-base dark:text-gray-100">
                  {newsTitle}
                </div>

                <div className="text-xs font-light text-gray-600 line-clamp-5 md:text-sm dark:text-gray-100">
                  {newsDesc}
                </div>
              </div>
            </a>
          </main>
        );
      })}
    </>
  );
};

export default NewsCard;
