"use client"

import {useEffect, useMemo, useState} from "react";
import useSWR, {useSWRConfig} from "swr";
import {useTheme} from "@mui/system";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";

import {EndpointsURL, newsAPIInstance} from "@/app/_lib/api";
import { Service, Source} from "@/app/_types";
import {Services, ITEM_SIZES} from "@/app/_utils";
import LatestNews from "@/app/_components/LatestNews";
import Headlines from "@/app/_components/Headlines";
import SearchBox from "@/app/_components/SearchBox";
import FilterListIcon from '@mui/icons-material/FilterList';
import { debounce } from '@mui/material/utils';

import useHome from "@/app/(routes)/useHome";
import useGetNewsFeed from "@/app/_hooks/useGetNewsFeed";
import useQueryParams from "@/app/_hooks/useQueryParams";
import {usePathname, useRouter} from "next/navigation";
import {IconButton} from "@mui/material";
import FilterSheet from "@/app/_components/FilterSheet";
import Loading from "@/app/_components/Loading";

const QueryKey = {
    source: 'source',
    query: 'query'
}

export default function Home({ }) {
    const router = useRouter()
    const pathname = usePathname()
    const theme = useTheme()
    const { mutate } = useSWRConfig()

    const [filterModal, setFilterModalState] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [activeFilters, setActiveFilters] = useState({})

    const debouncedQuerySet = useMemo(() => debounce((query) => setSearchQuery(query), 700), [])

    useEffect(() => {
        router.replace(pathname + '?' + createQueryString(QueryKey.query, searchQuery))
        setTimeout(() => {
            mutate(EndpointsURL.guardians.topHeadLines)
            mutate(EndpointsURL.newsAPIAI.article)
            mutate(EndpointsURL.newsAPI.posts)
        }, 0)
    }, [searchQuery])

    const { data : newsAPISources } : {data: { sources: Source[] }} = useSWR(EndpointsURL.newsAPI.topHeadLineSources,
            url =>  newsAPIInstance.get(url, {params: {country: 'us', language: 'en'}}))

    const {searchParams, createQueryString} = useQueryParams()
    const activeTab :Service = searchParams.get(QueryKey.source) ?? "ALL"
    const query :string = searchParams.get(QueryKey.query) ?? ''

    const {newsAPIData, guardianData, newsAPIAIData} = useGetNewsFeed(query, activeFilters)

    const distinctCategories = useMemo(() => {
        return [...new Set(newsAPISources?.sources?.map(item => item.category))]
    }, [newsAPISources])

    const {latestNews, topHeadlines, loading} = useHome({newsAPIData, guardianData, newsAPIAIData, activeTab})



    return <Box pb={3}>
        <Box display="flex" px={3} pb={1}
             sx={{position: 'sticky', top: ITEM_SIZES.TOP_APP_BAR+'px',
            backgroundColor: 'background.paper', zIndex: 1000, width: '100%'}}>
            <SearchBox onChange={e => debouncedQuerySet(e.target.value)}/>
            <IconButton onClick={() => setFilterModalState(true)}>
                <FilterListIcon color="disabled" />
            </IconButton>
        </Box>
        {
            loading ? <Loading height="342px" /> :

            !query && <Box display="flex"
                           flexDirection="column">
                <Typography variant="h6" px={3}  mb={1} sx={{fontWeight: 'fontWeightBold'}}>
                    Top Headlines
                </Typography>
                <Box display="flex" sx={{"> div": {mr: 2}, overflowX: 'auto',
                    "&::-webkit-scrollbar": {display: "none"}}} px={3} >
                    {
                        topHeadlines?.slice(0, 4).map(news => <Headlines key={news.url} news={news} />)
                    }
                </Box>
            </Box>
        }

        <Box display="flex" pl={3} py={3} flexWrap="nowrap"
             zIndex={1000}
             mb={3} sx={{overflowX: 'auto',
            backgroundColor: 'background.paper',
            position: 'sticky', top: ITEM_SIZES.TOP_APP_BAR+ITEM_SIZES.SEARCH_BAR+'px',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        }}>
            {Services?.map(service => <Chip sx={{mr: 1, fontWeight: 'fontWeightMedium',
                fontSize: theme.typography.fontSize, color: activeTab === service.name ? 'background.paper' : theme.palette.grey[600]}}
                                            color={activeTab === service.name ? 'primary' : 'default'}
                                            key={service.name} label={service.name}
                                            onClick={() => router.replace(pathname + '?' + createQueryString(QueryKey.source, service.name))} />)}
        </Box>
        <Box px={3} display="flex"
             flexWrap="wrap">
            {
                loading ? <Loading height="342px" /> :
                    latestNews?.slice(4, latestNews.length).map(news => <LatestNews key={news.url} news={news} />)
            }
        </Box>
        <FilterSheet sheetState={filterModal}
                     categories={distinctCategories}
                     toggleSheet={setFilterModalState}
                     onSubmit={setActiveFilters}
        />
    </Box>
}
