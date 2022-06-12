import { useSelector } from "react-redux";
import { selectNews } from "../../features/news/newsSlice";

// Default image
import defaultImg from "../../assets/images/404-01-scaled.jpg";

const NewsCard = () => {
  const news = useSelector(selectNews);

  const showDefaultImg = (e) => {
    e.target.src = defaultImg;
  };

  return (
    <>
      {news?.map((result) => {
        const newsImage = result.urlToImage ? result.urlToImage : defaultImg;
        const newsUrl = result.url;
        const newsTitle = result.title;

        return (
          <>
            <div className="relative w-96 rounded-3xl">
              <a href={newsUrl} target="_blank" rel="noreferrer">
                <img
                  src={newsImage}
                  alt={newsTitle}
                  onError={showDefaultImg}
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
