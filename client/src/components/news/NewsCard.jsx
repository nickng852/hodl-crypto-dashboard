import { useSelector } from 'react-redux'

import defaultImg from '../../assets/images/no-image-available.jfif'
import { selectNews } from '../../features/news/newsSlice'

const NewsCard = () => {
    const news = useSelector(selectNews)

    const showDefaultImg = (e) => {
        e.target.src = defaultImg
    }

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

                return (
                    <main
                        key={index}
                        className="w-116 relative rounded-xl bg-white p-4 dark:bg-secondary xl:p-6"
                    >
                        <a href={newsUrl} target="_blank" rel="noreferrer">
                            <img
                                src={newsImage}
                                alt={newsTitle}
                                onError={showDefaultImg}
                                className="h-60 w-full rounded-xl bg-center object-cover sm:h-80 md:h-96 lg:h-64"
                            />

                            <div className="space-y-3 px-2 py-5">
                                {newsSource && (
                                    <>
                                        <div className="flex space-x-3">
                                            <span className="truncate rounded-md bg-blue-50 px-2 py-1 text-xs font-medium leading-5 text-blue-500">
                                                {newsSource}
                                            </span>
                                        </div>
                                    </>
                                )}

                                <div className="line-clamp-2 text-sm text-gray-600 dark:text-gray-100 md:text-base">
                                    {newsTitle}
                                </div>

                                <div className="line-clamp-5 text-xs font-light text-gray-600 dark:text-gray-100 md:text-sm">
                                    {newsDesc}
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
