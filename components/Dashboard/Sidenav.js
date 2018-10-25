import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const tempImage =
  'https://scontent.fceb2-1.fna.fbcdn.net/v/t1.0-9/44703453_10215143626916678_2683641750047686656_o.jpg?_nc_cat=110&_nc_ht=scontent.fceb2-1.fna&oh=5baefebf31991962b11b20fcdf77aeb6&oe=5C87AA64'

const Sidenav = ({username}) => (
  <SideNav>
    <Header>
      <ProfilePic src={tempImage} />
      <div>
        <Username>{username}</Username>
        <Type>Programmer</Type>
      </div>
    </Header>

    <NavList>
      <Link href="/dashboard" prefetch>
        <NavItem>
          <NavIcon>
            <FontAwesomeIcon icon="home" style={{width: '100%', height: '100%'}} />
          </NavIcon>

          <LinkName>Overview</LinkName>
        </NavItem>
      </Link>

      <Link href="/dashboard/boards" prefetch>
        <NavItem>
          <NavIcon>
            <FontAwesomeIcon icon="columns" style={{width: '100%', height: '100%'}} />
          </NavIcon>
          <LinkName>Boards</LinkName>
        </NavItem>
      </Link>
    </NavList>
  </SideNav>
)

Sidenav.propTypes = {
  username: PropTypes.string.isRequired,
}

export default Sidenav

const LinkName = styled.p`
  margin-top: 0;
`

const SideNav = styled.aside`
  flex: 0.2;
  background-color: ${props => props.theme.contrast};
  margin-right: 4rem;
  max-height: 600px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 3px;
`

const Header = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
`

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 12px;
`

const NavItem = styled.li`
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const NavIcon = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 2px;
  margin-right: 1rem;
`

const ProfilePic = styled.img`
  border-radius: 2px;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  margin-right: 1rem;
`

const Username = styled.p`
  font-size: 12px;
`
const Type = styled.small`
  font-size: 10px;
  font-color: rgba(244, 244, 244, 0.9);
`
