import {useCallback} from "react";
import {useSearchParams} from "next/navigation";


export const useQueryParams = () => {
    const searchParams = useSearchParams()!
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    return {createQueryString, searchParams}
}

export default useQueryParams