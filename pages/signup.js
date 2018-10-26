import {Fragment} from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'

import defaultPage from '../hocs/defaultPage'
import SignupForm from '../components/Auth/SignupForm'

const Signup = () => (
  <Fragment>
    <Head>
      <title>Create a Super OS Account</title>
    </Head>

    <FullPage>
      <SectionWrapper>
        <LoginHeader>
          <HeadingText>Create a Super OS Account</HeadingText>
          <HeadingSubtitle>
            or{' '}
            <Link href="/" prefetch>
              <a>sign in to your account</a>
            </Link>
          </HeadingSubtitle>
        </LoginHeader>
        {/* Handles all the logic for signup */}
        <SignupForm />
        {/* ^^^^^^ */}
        <AcceptTermsMessage>
          By creating an account, you agree to our{' '}
          <Link href="/">
            <a>Terms of Service</a>
          </Link>{' '}
          and{' '}
          <Link href="/">
            <a>Privacy Policy.</a>
          </Link>{' '}
        </AcceptTermsMessage>
      </SectionWrapper>
    </FullPage>
  </Fragment>
)

const FullPage = styled.section`
  height: 100%;
  padding: 3em 1em 4em;
  text-align: center;
`

const SectionWrapper = styled.div`
  max-width: 460px;
  margin: 0 auto;
  text-align: left;
`

const HeadingText = styled.h1`
  font-size: 2.15rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const HeadingSubtitle = styled.h3`
  font-size: 18px;
  font-weight: 400;
`

const LoginHeader = styled.div`
  margin-bottom: 1.5rem;
`

const AcceptTermsMessage = styled.p`
  color: #999;
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 14px;
  line-height: 1.44rem;
`

export default defaultPage(Signup)
