import React from 'react'
import Proptypes from 'prop-types'
import styled from 'styled-components'
import {withApollo} from 'react-apollo'

import AuthService from '../utils/authService'
import redirect from '../lib/redirect'

import {Button} from './UI'

const onLogout = client => {
  AuthService.unsetToken()
  client.cache
    .reset()
    .then(() => {
      redirect({}, '/')
    })
    .catch(error => console.error(error))
}

const Header = ({client}) => (
  <HeaderWrapper>
    <p>Super OS</p>
    <div>
      <Button small nomargin onClick={() => onLogout(client)}>
        Logout
      </Button>
    </div>
  </HeaderWrapper>
)

Header.propTypes = {
  // apollo client passed down to reset cache
  client: Proptypes.object.isRequired, // eslint-disable-line
}

const HeaderWrapper = styled.header`
  position: sticky;
  height: 50px;
  padding: 0 5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 3px -2px rgba(0, 0, 0, 0.14),
    0 1px 8px 0 rgba(0, 0, 0, 0.12);
`

export default withApollo(Header)
