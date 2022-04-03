import { useSelector } from "react-redux";
import { selectNews } from "../../features/news/newsSlice";

// Default image
import notfoundimg from "../../assets/images/404-01-scaled.jpg";

const NewsCard = () => {
  const news = useSelector(selectNews);

  const addDefaultSrc = (e) => {
    e.target.src = notfoundimg;
  };

  return (
    <>
      {news.map((result, index) => {
        const newsImage = result.urlToImage ? result.urlToImage : notfoundimg;
        const newsTitle = result.title;
        const newsSource = result.source.name;
        /*         const newsDesc = result.description; */

        return (
          <>
            <div className="relative p-4 w-96 rounded-xl dark:bg-secondary">
              <a href={result.url} target="_blank" rel="noreferrer" key={index}>
                <img
                  src={newsImage}
                  onError={addDefaultSrc}
                  alt=""
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
                  {/*                   <div className="text-gray-600 dark:text-gray-100">
                    {newsDesc}
                  </div> */}
                </div>
              </a>
            </div>
          </>
        );
      })}
    </>
  );
};

export default NewsCard;
