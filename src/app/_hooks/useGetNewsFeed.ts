import {GuardiansHeadlines, NewsAPIAIHeadlines, NewsAPIHeadlines} from "@/app/_types";
import useSWR from "swr";
import {EndpointsURL, guardiansInstance, newsAPIAIInstance, newsAPIInstance} from "@/app/_lib/api";
import {useEffect, useMemo} from "react";
import {months} from "@/app/_utils";


export const useGetNewsFeed = (query = '', activeFilters) => {

    const {startDate, endDate} = useMemo(() => {
        const startDateSegs = activeFilters?.dateRange?.startDate ? String(activeFilters.dateRange.startDate).split(" ") : []
        const endDateSegs = activeFilters?.dateRange?.endDate ? String(activeFilters.dateRange.endDate).split(" ") : []
        const startDate = startDateSegs?.length ? `${startDateSegs?.[3]}-${months[startDateSegs?.[1]]}-${startDateSegs?.[2]}` : ''
        const endDate = endDateSegs?.length ? `${endDateSegs?.[3]}-${months[endDateSegs?.[1]]}-${endDateSegs?.[2]}` : ''

        return {startDate, endDate}
    }, [activeFilters])

    const newsOrgParams = useMemo(() => {
        const date =  activeFilters?.dateRange?.endDate ? {from: activeFilters?.dateRange?.startDate, to: activeFilters?.dateRange?.endDate} : {}
        const q = {q: query}
        return {language: 'en', ...date, ...q}
    }, [activeFilters, query])

    const { data : newsAPIData } : {data: NewsAPIHeadlines} = useSWR([query ? EndpointsURL.newsAPI.posts : EndpointsURL.newsAPI.topHeadLines, query, newsOrgParams],
            ([url, query]) =>  newsAPIInstance.get(url,
        {params: newsOrgParams}))

    const guardianParams = useMemo(() => {

        const date = activeFilters?.dateRange?.endDate ? {'from-date': startDate, 'to-date': endDate} : {}
        return {...date, 'order-by':'newest', "show-fields": ["all"]}
    }, [activeFilters, startDate, endDate])

    const { data : guardianData} : {data: GuardiansHeadlines} = useSWR([EndpointsURL.guardians.topHeadLines, query, guardianParams], ([url, query]) =>
        guardiansInstance.content.search(query, guardianParams))


    const AIPostData = useMemo(() => {
        const categoryUri = activeFilters?.dateRange?.categories?.reduce((acc, cat) => {
            acc.push(cat.uri)
            return acc
        }, [])

        const authorUri = activeFilters?.dateRange?.authors?.reduce((acc, author) => {
            acc.push(author.uri)
            return acc
        }, [])

        const sourceUri = activeFilters?.dateRange?.sources?.reduce((acc, source) => {
            acc.push(source.uri)
            return acc
        }, [])

        return {categoryUri, authorUri, sourceUri, dateStart: startDate, dateEnd: endDate,
            lang: ["eng"], keyword: query, apiKey: process.env.NEXT_PUBLIC_NEWS_API_AI_API_KEY}
    }, [activeFilters, query, startDate, endDate])

    const { data : newsAPIAIData = {}} : {data:  NewsAPIAIHeadlines } = useSWR([EndpointsURL.newsAPIAI.article, query, AIPostData],
            ([url, query, AIPostData]) =>
                newsAPIAIInstance.post(url,  AIPostData))


    return {newsAPIData, guardianData, newsAPIAIData}

}

export default useGetNewsFeed