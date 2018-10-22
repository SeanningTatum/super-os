import React from 'react'
import {Mutation, withApollo} from 'react-apollo'
import styled from 'styled-components'
import gql from 'graphql-tag'

import redirect from '../lib/redirect'
import AuthService from '../utils/authService'

import {Button, FormGroup, Input, Label, Alert} from './UI'

const SIGN_IN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

const LoginForm = ({client}) => {
  let email
  let password

  return (
    <LoginContainer>
      <Mutation
        mutation={SIGN_IN}
        onCompleted={data => {
          const accessToken = data.login

          // Store the token in cookie
          AuthService.setToken(accessToken)

          // Force a reload of all the current queries now that the user is
          // logged in
          client.cache.reset().then(() => {
            redirect({}, '/secret')
          })
        }}
      >
        {(signin, {data, error}) => (
          <form
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()

              signin({
                variables: {
                  email: email.value,
                  password: password.value,
                },
              })

              email.value = ''
              password.value = ''
            }}
          >
            <FormGroup>
              {error && error.graphQLErrors.map(({message}) => <Alert danger>{message}</Alert>)}
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                required
                ref={node => {
                  email = node
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                required
                ref={node => {
                  password = node
                }}
              />
            </FormGroup>

            <Button>Log In</Button>
          </form>
        )}
      </Mutation>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  max-width: 430px;
  margin: 0 auto;
`

export default withApollo(LoginForm)
