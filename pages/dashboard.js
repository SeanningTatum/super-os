import React from 'react'
import styled from 'styled-components'

import securePage from '../hocs/securePage'
import Header from '../components/Header'

const dashboard = ({loggedUser}) => (
  <DashboardWrapper>
    <Header />
    <h1>Welcome back {loggedUser.email}</h1>
  </DashboardWrapper>
)

const DashboardWrapper = styled.div`
  background-color: rgba(245, 245, 245);
  height: 100%;
`

export default securePage(dashboard)
