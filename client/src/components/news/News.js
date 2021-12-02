import React from "react";
import moment from "moment";

const News = ({ news }) => {
  return (
    <>
      <div className="grid gap-y-10">
        {news.map((result, index) => {
          const newsImage = result.urlToImage;
          const newsTitle = result.title;
          const newsDescription = result.description;
          const newsPublishDate = moment(result.publishedAt).format(
            "MMM DD, YYYY．h:mm A"
          );

          return (
            <a href={result.url} target="_blank" rel="noreferrer">
              <div className="relative flex overflow-hidden transition-shadow duration-200 bg-white shadow dark:bg-gray-800 h-60 rounded-2xl hover:shadow-lg">
                <div className="flex w-1/5">
                  <img
                    src={newsImage}
                    alt=""
                    className="object-cover bg-center rounded-2xl h-60 w-60"
                  />
                </div>

                <div className="flex flex-col justify-between w-4/5">
                  <div className="py-6 pr-8">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 ">
                      {newsTitle}
                    </h1>

                    <p className="mt-2 text-gray-600 text-md dark:text-gray-300">
                      {newsDescription}
                    </p>

                    <p className="mt-4 font-light text-gray-600 text-md dark:text-gray-300">
                      {newsPublishDate}
                    </p>
                  </div>

                  <div className="absolute bottom-0 right-0 px-8 py-6">
                    <p className="text-sm font-light text-right text-gray-600 text-md dark:text-gray-300">
                      From <strong>{result.source.name}</strong>
                    </p>
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
