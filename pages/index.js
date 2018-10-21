import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import LoginForm from '../components/Auth/LoginForm'
import defaultPage from '../hocs/defaultPage'

const index = () => (
  <AppWrapper>
    <Head>
      <title>Super OS</title>
    </Head>
    <FullPage>
      <SectionWrapper>
        <HeadingText>Welcome back to Super OS</HeadingText>
        <br />
        <br />
        <br />
        <h1>Login in to Super OS</h1>
        <br />
        <h5>
          or <a href="">create an account</a>
        </h5>

        <LoginForm />
      </SectionWrapper>
    </FullPage>
    <Jumbotron />
  </AppWrapper>
)

// Styles
const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
`

const FullPage = styled.section`
  height: 100%;
  padding: 2em 1em 4em;
  text-align: center;
`

const SectionWrapper = styled.div`
  max-width: 1200px;
  padding-top: 5vh;
  margin: 0 auto;
`

const HeadingText = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`

const Jumbotron = styled.div`
  height: 300px;
  background-color: red;
`

export default defaultPage(index)
