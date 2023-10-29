import {newsAPIInstance, guardiansInstance, newsAPIAIInstance} from "@/app/_lib/api/config";

newsAPIInstance.interceptors.response.use(response => response?.data)
newsAPIAIInstance.interceptors.response.use(response => response?.data)
// guardiansInstance.interceptors.response.use(response => response?.data?.response)

export {newsAPIInstance, guardiansInstance, newsAPIAIInstance}
export * from './consts'