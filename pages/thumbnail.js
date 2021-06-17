import { useRouter } from 'next/router'

function Thumbnail() {
    const router = useRouter()
    const { name, owner } = router.query

    return <p>{owner}/<b>{name}</b></p>
}

export default Thumbnail