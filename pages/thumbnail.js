function Thumbnail({ data }) {

    return <pre>{JSON.stringify(data, null, 2)}</pre>
}

Thumbnail.getInitialProps = async (context) => {
    const { uid } = context.query
    const response = await fetch(`https://api.github.com/repos/${uid}`)
    const data = await response.json()

    return { data }
}

export default Thumbnail