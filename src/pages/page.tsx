import React from 'react'
import { Page } from 'rakkasjs'
import { trpc } from '../utils/trpc'

const HomePage: Page = () => {
  const { data } = trpc.useQuery(['healthz'])

  return (
    <main>
      <h1>Hello world!</h1>
      <p>Welcome to Rakkas.JS demo page.</p>
      <p>tRPC endpoint health check: {data ? 'success' : 'failed'}</p>
      {data && <p>Message: {data}</p>}
    </main>
  )
}

export default HomePage
