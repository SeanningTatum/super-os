import {Fragment} from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import securePage from '../../hocs/securePage'

const dashboard = () => (
  <Fragment>
    <Head>
      <title>Dashboard</title>
    </Head>
    <h5>Active Todos</h5>
  </Fragment>
)

export default securePage(dashboard)
