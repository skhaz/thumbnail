import { useRouter } from 'next/router'
import Head from 'next/head'

import getBaseURL from '../helpers/base-url'

export default function Index() {
  const router = useRouter()
  const { uid } = router.query

  if (!uid) {
    return null
  }

  // TODO move this to a function
  const url = getBaseURL()

  return (
    <div>
      <Head>
        <title>{uid.join('/')}</title>
        <meta property="og:image" content={`${url}/api/thumbnail/${uid.join('/')}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="600" />
        <meta property="og:type" content="object" />
      </Head>
    </div>
  )
}
