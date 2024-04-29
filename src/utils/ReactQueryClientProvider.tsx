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
             staleTime: 6 * 1000,
             refetchInterval:6*1000,
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