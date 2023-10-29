"use client";

import {SWRConfig} from "swr";
import {swrConfig} from "@/app/_lib/SWR/config";

export default function SWRProvider({ children }) {

    return (
        <SWRConfig value={swrConfig}>
            {children}
        </SWRConfig>
    )
}
