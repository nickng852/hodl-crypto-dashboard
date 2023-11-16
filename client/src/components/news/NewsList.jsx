import moment from 'moment'
import { useSelector } from 'react-redux'

import defaultImg from '../../assets/images/no-image-available.jfif'
import { selectNews } from '../../features/news/newsSlice'

const NewsList = () => {
    const news = useSelector(selectNews)

    return (
        <main className="flex flex-col justify-between gap-y-10 2xl:h-[35rem]">
            {news?.map((result, index) => {
                const newsImage = result.urlToImage
                    ? result.urlToImage
                    : defaultImg
                const newsTitle = result.title
                const newsPublishDate = moment(result.publishedAt).format(
                    'YYYY-MM-DD'
                )

                return (
                    <a
                        href={result.url}
                        target="_blank"
                        rel="noreferrer"
                        key={index}
                    >
                        <div className="flex h-full gap-2 rounded-2xl bg-white p-2 dark:bg-secondary">
                            <img
                                alt={newsTitle}
                                src={newsImage}
                                className="h-36 w-40 flex-shrink-0 overflow-hidden rounded-2xl bg-center object-cover"
                                onError={(e) => (e.target.src = defaultImg)}
                            />

                            <div className="flex w-full flex-col justify-between gap-6 p-[.5rem]">
                                <div className="flex flex-col gap-3">
                                    <div className="line-clamp-2 dark:text-gray-100 md:text-base xl:text-lg 2xl:text-base">
                                        {newsTitle}
                                    </div>

                                    <div>
                                        <span className="truncate rounded-md bg-blue-50 px-2 py-1 text-xs font-medium leading-5 text-blue-500">
                                            {result.source.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <div className="align-center flex gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="h-5 w-5 text-gray-600 dark:text-gray-300"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>

                                        <span className="font-light text-gray-600 dark:text-gray-300 md:text-sm xl:text-base 2xl:text-sm">
                                            {newsPublishDate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                )
            })}
        </main>
    )
}

export default NewsList
