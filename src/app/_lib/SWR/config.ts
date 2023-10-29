import type {SWRConfiguration} from 'swr'

export const swrConfig: SWRConfiguration = {
    use: [],
    suspense: false,
    refreshInterval: 0,
    errorRetryCount: 3,
    loadingTimeout: 3000,
    dedupingInterval: 10000,
    keepPreviousData: false,
    revalidateOnFocus: false,
    revalidateIfStale: true,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    shouldRetryOnError: true,
    errorRetryInterval: 5000,
    // revalidateOnMount: true,
    focusThrottleInterval: 5000,
    revalidateOnReconnect: true,
}
