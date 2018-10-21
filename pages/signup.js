import React from 'react'
import Link from 'next/link'

import SignupBox from '../components/SignupBox'

const Signup = () => (
  <React.Fragment>
    {/* SignUpBox handles all login logic. */}
    <SignupBox />
    <hr />
    New?{' '}
    <Link prefetch href="/create-account">
      <a>Create account</a>
    </Link>
  </React.Fragment>
)

export default Signup
