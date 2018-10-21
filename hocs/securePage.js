import React from 'react'
import PropTypes from 'prop-types'

import defaultPage from './defaultPage'

const securePageHoc = Page =>
  class SecurePage extends React.Component {
    static getInitialProps(ctx) {
      return Page.getInitialProps && Page.getInitialProps(ctx)
    }

    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
    }

    render() {
      const {props} = this

      if (!props.isAuthenticated) {
        return <h5>Not Authorized</h5>
      }
      return <Page {...props} />
    }
  }

export default Page => defaultPage(securePageHoc(Page))
