import { useRouter } from 'next/router'

import { Title } from '../components/Title'

function Thumbnail() {
    const router = useRouter()
    const { owner, name } = router.query

    return <Title owner={owner} name={name} />
}

export default Thumbnail