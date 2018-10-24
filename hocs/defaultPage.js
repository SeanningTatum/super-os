import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'

import AuthService from '../utils/authService'
import {unsecuredPages} from '../utils/constants'
import redirect from '../lib/redirect'
import DefaultLayout from '../layout/defaultLayout'
import DashboardLayout from '../layout/dashboardLayout'

export default Page =>
  class DefaultPage extends React.Component {
    static getInitialProps(ctx) {
      const loggedUser = process.browser
        ? AuthService.getUserFromLocalCookie()
        : AuthService.getUserFromServerCookie(ctx.req)

      const isAuthenticated = !!loggedUser
      const pageProps = Page.getInitialProps && Page.getInitialProps(ctx)

      // If user is authenticated and is the unsecuredPagesArray
      // redirect user to somewhere useful.
      if (isAuthenticated && unsecuredPages.includes(ctx.pathname)) {
        redirect(ctx, '/dashboard')
      }

      return {
        ...pageProps,
        loggedUser,
        isAuthenticated,
        currentUrl: ctx.pathname,
      }
    }

    componentDidMount() {
      window.addEventListener('storage', this.logout, false)
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.logout, false)
    }

    logout = eve => {
      console.log('in here')
      if (eve.key === 'logout') {
        Router.push(`/?logout=${eve.newValue}`)
      }
    }

    render() {
      const {props} = this
      const {loggedUser} = props

      return (
        <App>
          {props.isAuthenticated ? (
            <DashboardLayout loggedUser={loggedUser}>
              <Page {...props} />
            </DashboardLayout>
          ) : (
            <DefaultLayout>
              <Page {...props} />
            </DefaultLayout>
          )}
        </App>
      )
    }
  }

const App = styled.div`
  height: 100vh;
`
