export default function baseUrl() {
    return (process.env.VERCEL && `https://${process.env.VERCEL_URL}`) || 'http://localhost:3000'
}
