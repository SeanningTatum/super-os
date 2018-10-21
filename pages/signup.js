import React, {Fragment} from 'react'
import styled from 'styled-components'
import Head from 'next/head'

import defaultPage from '../hocs/defaultPage'
import SignupForm from '../components/SignupForm'

const Signup = () => (
  <Fragment>
    <Head>
      <title>Create a Super OS Account</title>
    </Head>

    <FullPage>
      <SectionWrapper>
        <HeadingText>Create a Super OS Account</HeadingText>
        <h5>or sign in to your account</h5>
        <SignupForm />
      </SectionWrapper>
    </FullPage>
  </Fragment>
)

const FullPage = styled.section`
  height: 100%;
  padding: 2em 1em 4em;
  text-align: center;
`

const SectionWrapper = styled.div`
  max-width: 460px;
  margin: 0 auto;
  text-align: left;
`

const HeadingText = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`

export default defaultPage(Signup)
