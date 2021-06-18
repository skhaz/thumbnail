import querystring from 'querystring'
import Head from 'next/head'

import baseUrl from '../helpers/base-url'

export default function Index({ data }) {
  const { name, owner: { login: owner }, description, stargazers_count: stars, forks_count: forks } = data

  const query = {
    name,
    owner,
    description,
    stars,
    forks,
  }

  const domain = baseUrl()
  const thumbnail = `${domain}/api/thumbnail.jpg?${querystring.stringify(query)}`
  const url = [domain, owner, name].join('/')
  const title = [owner, name].join('/')

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={thumbnail} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={domain} />
        <meta property="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="twitter:image" content={thumbnail} />
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
