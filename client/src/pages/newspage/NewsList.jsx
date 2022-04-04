import { useSelector } from "react-redux";
import { selectNews } from "../../features/news/newsSlice";

// Default image
import defaultImg from "../../assets/images/404-01-scaled.jpg";

const NewsList = () => {
  const news = useSelector(selectNews);

  const showDefaultImg = (e) => {
    e.target.src = defaultImg;
  };

  return (
    <>
      {news.map((result) => {
        const newsImage = result.urlToImage ? result.urlToImage : defaultImg;
        const newsUrl = result.url;
        const newsSource = result.source.name;
        const newsTitle = result.title;

        return (
          <>
            <div className="relative p-4 w-96 rounded-xl dark:bg-secondary">
              <a href={newsUrl} target="_blank" rel="noreferrer">
                <img
                  alt={newsTitle}
                  src={newsImage}
                  onError={showDefaultImg}
                  className="object-cover w-full bg-center h-60 rounded-xl"
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

                  <div className="text-gray-600 dark:text-gray-100">
                    {newsTitle}
                  </div>
                </div>
              </a>
            </div>
          </>
        );
      })}
    </>
  );
};

export default NewsList;
