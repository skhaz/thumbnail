function Index({ data }) {

  return <pre>{JSON.stringify(data)}</pre>
}

Index.getInitialProps = async (context) => {
  const { slug } = context.query
  const response = await fetch(`https://api.github.com/repos/${slug}`)
  const data = await response.json()

  return { data }
}

export default Index