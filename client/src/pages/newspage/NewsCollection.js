// Components
import Spinner from "../../components/loader/Spinner";
import NewsList from "./NewsList";

// Services
import { useGetNewsQuery } from "../../services/cryptoApi";

const NewsCollection = ({ keyword, defaultKeyword }) => {
  // News API call
  const { data: newsApi, isFetching: isNewsFetching } = useGetNewsQuery({
    keyword: defaultKeyword,
    pageSize: "100",
  });

  const news = newsApi?.articles;

  console.log(news);

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
          <div className="grid h-full grid-cols-4 place-items-center">
            <NewsList news={news} />
          </div>
        </>
      )}
    </>
  );
};

export default NewsCollection;
