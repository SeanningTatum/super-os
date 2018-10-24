import React from 'react'
import styled from 'styled-components'

import {Button} from '../components/UI'
import securePage from '../hocs/securePage'
import Header from '../components/Header'

const dashboard = ({loggedUser}) => (
  <DashboardWrapper>
    <Header />
    <h1>Welcome back {loggedUser.email}</h1>

    <MainContent />
    <Button>Hello</Button>
  </DashboardWrapper>
)

const DashboardWrapper = styled.div`
  background-color: rgba(245, 245, 245);
  height: 100%;
`

const MainContent = styled.div``

export default securePage(dashboard)
