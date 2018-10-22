import React from 'react'
import Head from 'next/head'
import App, {Container} from 'next/app'
import {ApolloProvider} from 'react-apollo'

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
                background-color: rgb(250, 250, 250);
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
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
