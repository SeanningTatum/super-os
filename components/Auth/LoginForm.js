import React, {Fragment} from 'react'
import {Mutation, withApollo} from 'react-apollo'
import gql from 'graphql-tag'

import redirect from '../../lib/redirect'
import AuthService from '../../utils/authService'
import {Button, FormGroup, Input, Label, Alert} from '../UI'

const SIGN_IN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

const LoginForm = ({client}) => {
  let email
  let password

  return (
    <Fragment>
      <Mutation
        mutation={SIGN_IN}
        onCompleted={data => {
          const accessToken = data.login

          // Store the token in cookie
          AuthService.setToken(accessToken)

          // Force a reload of all the current queries now that the user is
          // logged in
          client.cache.reset()
          redirect({}, '/dashboard')
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
                placeholder="e.g. johndoe@apple.com"
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
                placeholder="e.g. "
                ref={node => {
                  password = node
                }}
              />
            </FormGroup>

            <Button>Log In</Button>
          </form>
        )}
      </Mutation>
    </Fragment>
  )
}

export default withApollo(LoginForm)
