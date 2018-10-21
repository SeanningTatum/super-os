import React from 'react'
import {Mutation, withApollo} from 'react-apollo'
import gql from 'graphql-tag'

import redirect from '../lib/redirect'
import AuthService from '../utils/authService'

const SIGN_IN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`

// TODO: Find a better name for component.
const SigninBox = ({client}) => {
  let email
  let password

  return (
    <Mutation
      mutation={SIGN_IN}
      onCompleted={data => {
        console.log('token', data.login)
        // Store the token in cookie
        AuthService.setToken(data.login, data.login)

        // // Force a reload of all the current queries now that the user is
        // // logged in
        client.cache.reset().then(() => {
          redirect({}, '/')
        })
      }}
      onError={error => {
        // If you want to send error to external service?
        console.log(error)
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

            email.value = password.value = ''
          }}
        >
          {error && <p>No user found with that information.</p>}
          <input
            name="email"
            placeholder="Email"
            ref={node => {
              email = node
            }}
          />
          <br />
          <input
            name="password"
            placeholder="Password"
            ref={node => {
              password = node
            }}
            type="password"
          />
          <br />
          <button>Sign in</button>
        </form>
      )}
    </Mutation>
  )
}

export default withApollo(SigninBox)
