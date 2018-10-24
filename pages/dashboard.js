import React, {Fragment} from 'react'

import securePage from '../hocs/securePage'

const dashboard = ({loggedUser}) => (
  <Fragment>
    <h1>Welcome back {loggedUser.email}</h1>
  </Fragment>
)

export default securePage(dashboard)
