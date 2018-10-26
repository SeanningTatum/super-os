import React from 'react'
import Head from 'next/head'
import App, {Container} from 'next/app'
import '@atlaskit/css-reset'
import {ApolloProvider} from 'react-apollo'
import {ThemeProvider} from 'styled-components'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faColumns, faHome} from '@fortawesome/free-solid-svg-icons'

import withApollo from '../lib/withApollo'
import {theme} from '../utils/constants'

library.add(faColumns)
library.add(faHome)

class MyApp extends App {
  static async getInitialProps({Component, router, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render() {
    const {Component, pageProps, apolloClient} = this.props
    const cssFiles = ['https://fonts.googleapis.com/css?family=Open+Sans:400,700,800']
    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {cssFiles.map((c, i) => (
            <link key={i} href={c} rel="stylesheet" />
          ))}
          <style global="true">{`
              * {
                font-family: 'Open Sans', sans-serif;
                box-sizing: border-box;
              }

              body {
                background-color: rgb(246, 246, 246);
                overflow: hidden;
              }

            `}</style>
        </Head>

        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
