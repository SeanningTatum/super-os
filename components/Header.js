import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Header = () => (
  <AppHeader>
    <HeaderBrand>Super OS</HeaderBrand>
    <Link href="/">
      <HeaderLink>Home</HeaderLink>
    </Link>
    <Link href="/secret-route">
      <HeaderLink>Secret Route</HeaderLink>
    </Link>
    <Link href="/signin" prefetch>
      <HeaderLink>Login</HeaderLink>
    </Link>
    <Link href="/signup">
      <HeaderLink>Register</HeaderLink>
    </Link>
  </AppHeader>
)

const AppHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  background-color: #1a73e8;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 3px -2px rgba(0, 0, 0, 0.14),
    0 1px 8px 0 rgba(0, 0, 0, 0.12);
  color: white;
  padding: 0 20px;
`

const HeaderLink = styled.a`
  margin-right: 20px;
  font-size: 14px;
  color: ${p => (p.isActive ? '#333' : '#999')};
  text-decoration: none;
  text-transform: uppercase;
  padding-top: 2px;
  padding-bottom: 2px;
  border-top: 1px solid ${p => (p.isActive ? '#333' : 'transparent')};
  border-bottom: 1px solid ${p => (p.isActive ? '#333' : 'transparent')};
  transition: color .25s;
  font-weight: isActive ? '600' : '400';

  &:hover {
    color: #333;
  }
`

const HeaderBrand = styled.h3`
  margin-right: 20px;
`

export default Header
