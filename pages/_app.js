import React from 'react'
import Head from 'next/head'
import App, {Container} from 'next/app'
import {ApolloProvider} from 'react-apollo'
import {ThemeProvider} from 'styled-components'

import {theme} from '../utils/constants'
import withApollo from '../lib/withApollo'

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
    const cssFiles = [
      'https://unpkg.com/normalize.css@5.0.0/normalize.css',
      'https://fonts.googleapis.com/css?family=Open+Sans:400,700,800',
    ]
    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {cssFiles.map((c, i) => (
            <link key={i} href={c} rel="stylesheet" />
          ))}
          <style>{`
              * {
                margin: 0;
                font-family: 'Open Sans', sans-serif;
                box-sizing: border-box;
              }

              body {
                background-color: rgb(246, 246, 246);
              }

              input {
                background-color: rgb(243, 243, 243);
              }

              a {
                cursor: pointer;
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
