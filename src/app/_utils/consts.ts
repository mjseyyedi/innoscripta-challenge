import {Service} from "@/app/_types";

type IService = {name: Service}

const ALLServices :IService = {name: 'ALL'}
const NewsAPI :IService = {name: 'News API ORG'}
const NewsAPIAI :IService = {name: 'News API AI'}
const TheGuardians :IService = {name: 'The Guardians'}

export const Services :IService[] = [ALLServices, NewsAPI, NewsAPIAI, TheGuardians]

export const ITEM_SIZES = {
    TOP_APP_BAR: 56,
    SEARCH_BAR: 48
}

export const months = {"Jan" : 1, "Feb" : 2, 'Mar' : 3, 'Apr' : 4,
    'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10,
    'Nov': 11, 'Dec': 12};

// export const months = [undefined, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
