"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryConfig} from "@/app/_lib/config";

export default function ReactQueryProvider({ children }) {
    const [queryClient] = React.useState(
        () =>
            new QueryClient(ReactQueryConfig),
    )
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
