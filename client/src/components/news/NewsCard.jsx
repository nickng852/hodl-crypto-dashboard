import moment from 'moment'
import { useSelector } from 'react-redux'

import defaultImg from '../../assets/images/no-image-available.jfif'
import { selectNews } from '../../features/news/newsSlice'

const NewsCard = () => {
    const news = useSelector(selectNews)

    return (
        <>
            {news?.map((result, index) => {
                const newsImage = result.urlToImage
                    ? result.urlToImage
                    : defaultImg
                const newsUrl = result.url
                const newsSource = result.source.name
                const newsTitle = result.title
                const newsDesc = result.description
                const newsPublishDate = moment(result.publishedAt).format(
                    'YYYY-MM-DD'
                )

                return (
                    <main
                        key={index}
                        className="rounded-xl bg-white p-4 dark:bg-secondary"
                    >
                        <a href={newsUrl} target="_blank" rel="noreferrer">
                            <div className="flex flex-col gap-6">
                                <img
                                    alt={newsTitle}
                                    src={newsImage}
                                    className="h-60 w-full rounded-2xl bg-center object-cover sm:h-80 md:h-96 lg:h-64"
                                    onError={(e) => (e.target.src = defaultImg)}
                                />

                                <div className="flex w-full flex-col justify-between gap-6">
                                    <div className="flex flex-col gap-3">
                                        {newsSource && (
                                            <div>
                                                <span className="truncate rounded-md bg-blue-50 px-2 py-1 text-xs font-medium leading-5 text-blue-500">
                                                    {newsSource}
                                                </span>
                                            </div>
                                        )}

                                        <div className="line-clamp-2 text-sm text-gray-600 dark:text-gray-100 md:text-base">
                                            {newsTitle}
                                        </div>

                                        <div className="line-clamp-5 text-xs font-light text-gray-600 dark:text-gray-100 md:text-sm">
                                            {newsDesc}
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <div className="flex items-center gap-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4 text-gray-600 dark:text-gray-300 md:h-5 md:w-5"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>

                                            <span className="text-sm font-light text-gray-600 dark:text-gray-300 md:text-base">
                                                {newsPublishDate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </main>
                )
            })}
        </>
    )
}

export default NewsCard
