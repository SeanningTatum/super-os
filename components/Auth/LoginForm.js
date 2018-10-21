import React from 'react'
import {Mutation, withApollo} from 'react-apollo'
import styled from 'styled-components'
import gql from 'graphql-tag'

import redirect from '../../lib/redirect'
import AuthService from '../../utils/authService'

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
              {error && <h5>{error.message}</h5>}
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

            <SubmitButton>Log In</SubmitButton>
          </form>
        )}
      </Mutation>
    </LoginContainer>
  )
}

const FormGroup = styled.div`
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
`

const LoginContainer = styled.div`
  max-width: 430px;
  margin: 0 auto;
`

const Label = styled.label`
  text-align: left;
  margin-bottom: 8px;
`

const Input = styled.input`
  padding: 10px;
  border-radius: 0.3em;
  border: 1px solid rgb(215, 215, 215);
  font-size: 0.9rem;
`

const SubmitButton = styled.button`
  margin: 2em auto 1em !important;
  background: linear-gradient(to bottom, rgb(44, 147, 252) 0, rgb(42, 142, 248) 100%);
  border: 1px solid rgb(44, 147, 252);
  box-shadow: 0 2.5px 0 #026bd8;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 1.2;
  border-radius: 0.3em;
  cursor: pointer;
  padding: 0.7em 5em;
`

export default withApollo(LoginForm)
