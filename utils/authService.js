import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

class AuthService {
  setToken = accessToken => {
    if (!process.browser) {
      return
    }
    Cookie.set('user', jwtDecode(accessToken))
    Cookie.set('idToken', accessToken)
    // Cookie.set('accessToken', accessToken)
  }

  unsetToken = () => {
    if (!process.browser) {
      return
    }
    Cookie.remove('idToken')
    // Cookie.remove('accessToken')
    Cookie.remove('user')

    // to support logging out from all windows
    window.localStorage.setItem('logout', Date.now())
  }

  getUserFromServerCookie = req => {
    if (!req.headers.cookie) {
      return undefined
    }
    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('idToken='))
    if (!jwtCookie) {
      return undefined
    }
    const jwt = jwtCookie.split('=')[1]
    return jwtDecode(jwt)
  }

  getUserFromLocalCookie = () => Cookie.getJSON('user')
}

const authService = new AuthService()

export default authService
