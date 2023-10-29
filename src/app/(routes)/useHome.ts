import {useMemo, useState} from "react";
import {GuardiansHeadlines, LatestNews, NewsAPIAIHeadlines, NewsAPIHeadlines, NewsAPIItem, Service} from "@/app/_types";

export default function useHome( {newsAPIData, guardianData, newsAPIAIData, activeTab}: {newsAPIData: NewsAPIHeadlines,
    guardianData: GuardiansHeadlines, newsAPIAIData: NewsAPIAIHeadlines, activeTab: Service}) {

    const [loading, setLoading] = useState<boolean>(true)

    const getNewsAPIList = (startIndex, endIndex) => newsAPIData?.articles?.slice(startIndex, endIndex)
        .reduce((acc, item) => {
            acc.push({apiUrl: item.url, url: item.url,
                image: item.urlToImage, body: item.content,
                publicationDate: item.publishedAt,
                title: item.title, source: {name: item.source.name, url: item.url}})
            return acc
        }, [])

    const getNewsAPIAIList = (startIndex, endIndex) => newsAPIAIData?.recentActivityArticles?.activity?.slice(startIndex, endIndex)
        .reduce((acc, item) => {
        acc.push({apiUrl: item.url, url: item.url, image: item.image, source: {name: item.source.title, url: item.source.uri},
            body: item.body, publicationDate: item.dateTimePub, title: item.title})
        return acc
    }, [])


    const getGuardiansList = (startIndex, endIndex) => guardianData?.results?.slice(startIndex, endIndex)
        .reduce((acc, item) => {
        acc.push({apiUrl: item.apiUrl, url: item.webUrl, image: item.fields?.thumbnail, source: {name: item.fields.publication, url: item.fields.shortUrl},
            body: item.fields?.bodyText, publicationDate: item.webPublicationDate, title: item.webTitle})
        return acc
    }, [])

    const topHeadlines : LatestNews[] = useMemo(() => {
        if(newsAPIData?.articles && newsAPIAIData?.recentActivityArticles?.activity && guardianData?.results){
            setLoading(true)
            const source1 = getNewsAPIList(0, 2)

            const source2 = getNewsAPIAIList(0, 2)

            const source3 = getGuardiansList(0, 2)
            setLoading(false)
            return [...source1, ...source2, ...source3].sort((a ,b) => a.publicationDate > b.publicationDate ? -1 : 1)
        }
    }, [newsAPIData, guardianData, newsAPIAIData])

    const latestNews :LatestNews[] = useMemo(() => {
        if(newsAPIData?.articles && newsAPIAIData?.recentActivityArticles?.activity && guardianData?.results){
            setLoading(true)
            const source1 = activeTab.includes("ALL") || activeTab.includes("News API ORG") ? getNewsAPIList(0, 8) : []

            const source2 = activeTab.includes("ALL") || activeTab.includes("News API AI") ? getNewsAPIAIList(0, 8) : []

            const source3 = activeTab.includes("ALL") || activeTab.includes("The Guardians") ? getGuardiansList(0, 8) : []
            setLoading(false)
            return [...source1, ...source2, ...source3].sort((a ,b) => a.publicationDate > b.publicationDate ? -1 : 1)
        }

        return []

    }, [newsAPIData, guardianData, newsAPIAIData, activeTab])

    return {latestNews, topHeadlines, loading}

}
