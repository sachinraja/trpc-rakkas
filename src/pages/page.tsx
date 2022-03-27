import React from 'react'
import { Page } from 'rakkasjs'
import { trpc } from '../utils/trpc'

const HomePage: Page = () => {
  const { data } = trpc.useQuery(['healthz'])

  return (
    <main>
      <h1>Hello world!</h1>
      <p>Welcome to Rakkas.JS demo page.</p>
      <p>
        Try editing <code>src/pages/page.tsx</code> to get started or go to the{' '}
        <a href="https://rakkasjs.org" target="_blank" rel="noreferrer">
          website
        </a>
        .
      </p>
      <p>tRPC endpoint health check: {data ? 'success' : 'failed'}</p>
    </main>
  )
}

export default HomePage
