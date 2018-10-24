import React, {Fragment} from 'react'
import styled from 'styled-components'

import securePage from '../hocs/securePage'
import Header from '../components/Header'
import Sidenav from '../components/Dashboard/Sidenav'

const dashboard = ({loggedUser}) => (
  <FullPage>
    <div>
      <Header />
    </div>
    <DashboardWrapper>
      <Sidenav username={loggedUser.username} />
      <MainContent>
        <h5>Active Todos</h5>
      </MainContent>
    </DashboardWrapper>
  </FullPage>
)

// Styles
const FullPage = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const DashboardWrapper = styled.div`
  flex: 1;
  background-color: ${props => props.theme.background};
  min-height: 720px;
  display: flex;
  padding: 3rem 6rem 0;
  flex-direction: row;
  justify-content: space-between;
`

const MainContent = styled.div`
  flex: 1;
  max-height: 600px;
  padding: 0.5rem 0;
`

export default securePage(dashboard)
