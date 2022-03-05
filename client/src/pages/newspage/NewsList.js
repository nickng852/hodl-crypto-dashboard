// Default image
import notfoundimg from "../../assets/images/404-01-scaled.jpg";

const NewsCard = ({ news }) => {
  const addDefaultSrc = (e) => {
    e.target.src = notfoundimg;
  };

  return (
    <>
      {news.map((result, index) => {
        const newsImage = result.urlToImage ? result.urlToImage : notfoundimg;
        const newsTitle = result.title;
        const newsSource = result.source.name;

        return (
          <>
            <div className="relative p-4 bg-gray-100 w-96 rounded-xl dark:bg-secondary">
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
                        <span className="px-2 py-1 text-xs font-medium leading-5 text-gray-600 truncate bg-gray-200 rounded-md">
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

export default NewsCard;
