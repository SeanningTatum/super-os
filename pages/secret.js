import securedPage from '../hocs/securePage'

const secretPage = () => <h1>Secret Page</h1>

export default securedPage(secretPage)
