import { useRouter } from 'next/router'

import { Heading } from '../components/Heading'

function Thumbnail() {
    const router = useRouter()
    const { owner, name } = router.query

    return <Heading first={owner} second={name} />
}

export default Thumbnail