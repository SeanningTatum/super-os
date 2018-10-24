import React, {Fragment} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styled from 'styled-components'

import LoginForm from '../components/Auth/LoginForm'
import defaultPage from '../hocs/defaultPage'

const index = () => (
  <Fragment>
    <Head>
      <title>Super OS</title>
    </Head>
    <FullPage>
      <SectionWrapper>
        <HeadingContainer>
          <HeadingText>Login to Super OS</HeadingText>
          <HeadingSubtitle>
            or{' '}
            <Link href="/signup" prefetch>
              <a>create an account</a>
            </Link>
          </HeadingSubtitle>
        </HeadingContainer>

        <LoginForm />
      </SectionWrapper>
    </FullPage>
    <Jumbotron />
  </Fragment>
)

// Styles
const FullPage = styled.section`
  height: 100%;
  padding: 2em 1em 4em;
  text-align: center;
`

const SectionWrapper = styled.div`
  max-width: 430px;
  padding-top: 5vh;
  margin: 0 auto;
`

const HeadingText = styled.h1`
  font-size: 2.15rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const HeadingContainer = styled.div`
  text-align: left;
  margin-bottom: 1.5rem;
`

const HeadingSubtitle = styled.h3`
  font-size: 18px;
  font-weight: 400;
`

const Jumbotron = styled.div`
  height: 300px;
  background-color: red;
`

export default defaultPage(index)
