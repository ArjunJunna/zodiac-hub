"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const ReactQueryClientProvider = ({children}: {children: React.ReactNode}) => {
   const [queryClient] = useState(
     () =>
       new QueryClient({
         defaultOptions: {
           queries: {
             staleTime: 60 * 10000,
             refetchInterval:60*10000,
           },
         },
       })
   );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};