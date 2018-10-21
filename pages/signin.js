import React from 'react'
import Link from 'next/link'

import defaultPage from '../hocs/defaultPage'
import SigninBox from '../components/SigninBox'

const SignIn = ({loggedUser}) => (
  <React.Fragment>
    {loggedUser && loggedUser.email}
    {/* SigninBox handles all login logic. */}
    <SigninBox />
    <hr />
    New?{' '}
    <Link prefetch href="/create-account">
      <a>Create account</a>
    </Link>
  </React.Fragment>
)
export default defaultPage(SignIn)
