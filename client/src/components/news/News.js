import moment from "moment";

import notfoundimg from "../../assets/images/404-01-scaled.jpg";

const News = ({ news }) => {
  return (
    <>
      <div className="grid gap-y-7">
        {news.map((result, index) => {
          const newsImage = result.urlToImage ? result.urlToImage : notfoundimg;
          const newsTitle = result.title;
          const newsPublishDate = moment(result.publishedAt)
            .startOf("ss")
            .fromNow();

          return (
            <>
              <a href={result.url} target="_blank" rel="noreferrer" key={index}>
                <div className="relative overflow-hidden transition-shadow duration-200 bg-white shadow md:flex h-80 sm:h-96 md:h-60 xl:h-80 2xl:h-32 dark:bg-secondary rounded-xl hover:shadow-lg">
                  <div className="md:w-2/6 2xl:w-1/5">
                    <img
                      src={newsImage}
                      alt=""
                      className="object-cover w-full h-48 bg-center sm:h-60 md:h-60 xl:h-80 2xl:h-32 2xl:w-36 md:rounded-xl rounded-t-xl"
                    />
                  </div>

                  <div className="flex flex-col justify-between md:w-4/6 2xl:w-4/5">
                    <div className="p-5 md:p-6 xl:p-10 2xl:p-4">
                      <div className="text-sm font-semibold text-gray-900 sm:text-lg 2xl:text-base dark:text-gray-100 lg:text-xl">
                        {newsTitle}
                      </div>

                      <div className="mt-2 text-xs font-light text-gray-600 sm:text-base lg:text-lg 2xl:text-sm dark:text-gray-300">
                        {newsPublishDate}
                      </div>
                    </div>

                    <div className="absolute bottom-0 right-0 px-5 py-4 xl:p-8 lg:p-6 2xl:p-4">
                      <div className="text-xs font-light text-right text-gray-600 lg:text-lg sm:text-base 2xl:text-xs text-md dark:text-gray-300">
                        From <strong>{result.source.name}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </>
          );
        })}
      </div>
    </>
  );
};

export default News;
