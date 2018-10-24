import React from 'react'
import styled from 'styled-components'

const Header = () => (
  <HeaderWrapper>
    <p>Super OS</p>
  </HeaderWrapper>
)

const HeaderWrapper = styled.header`
  height: 50px;
  padding: 0 5rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 3px -2px rgba(0, 0, 0, 0.14),
    0 1px 8px 0 rgba(0, 0, 0, 0.12);
`

export default Header
