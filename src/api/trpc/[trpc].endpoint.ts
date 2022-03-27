/**
 * This file contains tRPC's HTTP response handler
 */
import { Dict, resolveHTTPResponse } from '@trpc/server'
import { RakkasRequest, RakkasResponse } from 'rakkasjs'
import { appRouter } from '../../server/routers/_app'

export default async (
  rawRequest: RakkasRequest
): Promise<RakkasResponse> => {
  const request = rawRequest as RakkasRequest & {
    headers: Dict<string | string[]>
  }

  const req = {
    method: request.method,
    headers: request.headers,
    query: request.url.searchParams,
    body: request.body,
  }

  // "/api/trpc/healthz" to "/healthz"
  const path = request.url.pathname.substring(
    request.url.pathname.lastIndexOf('/') + 1
  )

  const httpResponse = await resolveHTTPResponse({
    /**
     * Currently a no-op
     * @link https://trpc.io/docs/context
     */
    createContext: async () => undefined,
    path,
    req,
    router: appRouter,
    /**
     * @link https://trpc.io/docs/error-handling
     */
    onError({ error }) {
      if (error.code === 'INTERNAL_SERVER_ERROR') {
        // send to bug reporting
        console.error('Something went wrong', error)
      }
    },
    /**
     * Enable query batching
     */
    batching: {
      enabled: true,
    },
    /**
     * @link https://trpc.io/docs/caching#api-response-caching
     */
    // responseMeta() {
    //   // ...
    // },
  })

  return httpResponse
}
