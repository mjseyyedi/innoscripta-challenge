// News API Types

type NewsAPISource = {id: string | null, name: string}

export type NewsAPIResponse = {
    author: string
    content: string
    description: string
    publishedAt: string
    source: NewsAPISource
    title: string
    url: URL
    urlToImage: URL
}

export type NewsAPIHeadlines = {
    status: 'ok' | 'error'
    articles: NewsAPIResponse[]
    totalResults: number
}


export type Source = {
    category: string
    country: "ae" | "ar" | "at" | "au" | "be" | "bg" | "br" | "ca" | "ch " | "cn" | "co" | "cu" |
             "cz" | "de" | "eg" | "fr" | "gb" | "gr" | "hk" | "hu" | "id" | "ie" | "il" | "in" | "it" | "jp" | "kr" |
             "lt" | "lv" | "ma" |"mx" | "my" | "ng" | "nl" | "no" | "nz" | "ph" | "pl" | "pt" | "ro" | "rs" | "ru" |
             "sa" | "se" | "sg" | "si" | "sk" | "th" | "tr" | "tw" | "ua" | "us" | "ve" | "za"
    description: string
    id: string
    language: "ar" | "de" | "en" | "es" | "fr" | "he" | "it" | "nl" | "no" | "pt" | "ru" | "sv" | "ud" | "zh"
    name: string
    url: URL
}


// Guardians Types

export type GuardiansResponse = {
    apiUrl: URL
    id: string
    isHosted: boolean
    pillarId: string
    pillarName: string
    sectionId: string
    sectionName: string
    type: string
    webPublicationDate: Date
    webTitle: string
    webUrl: URL
    fields: {
        thumbnail: URL
        bodyText: string
        publication: string
        shortUrl: string
    }
}

export type GuardiansHeadlines = {
    status: "ok" | "error"
    userTier: "developer"
    total: number
    startIndex: number
    pageSize: number
    currentPage: number
    pages: number
    orderBy: "newest"
    results: GuardiansResponse[]
}


// News API AI Types

export type NewsAPIItem = {
    activity: NewsAPIAIActivity[]
    currTime: Date
    newestUpdate: Date
    newestUri: {news: string}
    oldestUpdate: Date
}

export type NewsAPIAIHeadlines = {
    recentActivityArticles: NewsAPIItem
}

type NewsAPIAIDataType = 'news' | 'blog' | 'pr'

type NewsAPIAIActivity = {
    authors: []
    body: string
    dateTime: Date
    dateTimePub: Date
    eventUri: string | null
    image: URL
    lang: string
    dataType: NewsAPIAIDataType
    source: NewsAPIAISource
    title: string
    uri: string
    url: URL
}

type NewsAPIAISource = {uri: string, dataType: NewsAPIAIDataType, title: string}

// end of services


export type Service = 'ALL' | 'News API ORG' | 'News API AI' | 'The Guardians'


export type LatestNews = {
    apiUrl: URL
    url: URL
    publicationDate: Date
    title: string
    image: URL
    body: string
    source: {name: string, url: string | URL}
}