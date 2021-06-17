import Head from 'next/head'

import getBaseURL from '../helpers/base-url'

export default function Index({ data }) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <Head>
        <title></title>
        <meta property="og:image" content={`${getBaseURL()}/api/thumbnail/`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="object" />
      </Head>
    </div>
  )
}

Index.getInitialProps = async (context) => {
  const { repo } = context.query
  const url = new URL(repo.join('/'), 'https://api.github.com/repos/').href
  const response = await fetch(url)
  const data = await response.json()

  return { data }
}