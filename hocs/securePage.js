import React from 'react'
import PropTypes from 'prop-types'

import DashBoardLayout from '../layout/dashboardLayout'

import defaultPage from './defaultPage'

const securePageHoc = Page =>
  class SecurePage extends React.Component {
    static getInitialProps({pathname, ...ctx}) {
      const pageProps = Page.getInitialProps && Page.getInitialProps(ctx)

      return {...pageProps, pathname}
    }

    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      loggedUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
    }

    render() {
      const {props} = this

      if (!props.isAuthenticated) {
        return <h5>Not Authorized</h5>
      }

      return (
        <DashBoardLayout loggedUser={props.loggedUser} inBoardPage={props.pathname === '/board'}>
          <Page {...props} />
        </DashBoardLayout>
      )
    }
  }

export default Page => defaultPage(securePageHoc(Page))
