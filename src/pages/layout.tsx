import { defineLayout, Layout } from 'rakkasjs'
import React from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from 'react-query'
import { trpc } from '../utils/trpc'
import superjson from 'superjson'

export default defineLayout({
  Component({ children }) {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
      trpc.createClient({
        url: '/api/trpc',
        transformer: superjson,
      })
    )

    return (
      <>
        {/* Rakkas relies on react-helmet-async for managing the document head */}
        {/* See their documentation: https://github.com/staylor/react-helmet-async#readme */}
        <Helmet title="tRPC Rakkas Demo App" />

        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      </>
    )
  },
  options: {
    ssr: false,
  },
})
