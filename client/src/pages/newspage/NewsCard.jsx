// Default image
import notfoundimg from "../../assets/images/404-01-scaled.jpg";

const NewsCard = ({ news }) => {
  return (
    <>
      {news.map((result, index) => {
        const newsImage = result.urlToImage || notfoundimg;
        const newsTitle = result.title;

        return (
          <>
            <div className="relative w-96 rounded-3xl">
              <a href={result.url} target="_blank" rel="noreferrer" key={index}>
                <img
                  src={newsImage}
                  alt=""
                  className="relative object-cover w-full bg-center h-80 rounded-3xl"
                />
                <div className="absolute bottom-0 w-full px-6 py-4 text-white truncate transform bg-gradient-to-t from-gray-600 backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-b-3xl">
                  {newsTitle}
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
