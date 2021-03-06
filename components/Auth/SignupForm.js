import React, {Component} from 'react'
import {Mutation, withApollo} from 'react-apollo'
import gql from 'graphql-tag'

import redirect from '../../lib/redirect'
import AuthService from '../../utils/authService'
import {Alert, Button, FormGroup, Input, Label} from '../UI'

const REGISTER = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password)
  }
`

class SignupForm extends Component {
  state = {
    form: {
      username: 'asd',
      email: '',
      password: '',
    },
    allowSubmit: false,
  }

  componentDidUpdate(_, prevState) {
    const {state} = this

    if (state.form !== prevState.form) {
      this.setState({allowSubmit: this.checkFormValid()})
    }
  }

  onInputChangedHandler = (formName, value) => {
    const {state} = this

    const tempForm = {...state.form}
    tempForm[formName] = value
    this.setState({form: tempForm})
  }

  checkFormValid = () => {
    const {form} = this.state
    const {username, email, password} = form
    return username && email && password
  }

  render() {
    const {state} = this

    return (
      <Mutation
        mutation={REGISTER}
        onCompleted={data => {
          const {props} = this
          const accessToken = data.register

          // Store the token in cookie
          AuthService.setToken(accessToken)

          // Force a reload of all the current queries now that the user is
          // logged in
          props.client.cache.reset().then(() => {
            redirect({}, '/dashboard')
          })
        }}
      >
        {(register, {data, error, loading}) => {
          if (loading) return <h5>Loading...</h5>

          return (
            <form
              onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()

                register({
                  variables: {
                    email: state.form.email,
                    username: state.form.username,
                    password: state.form.password,
                  },
                })
              }}
            >
              {error && error.graphQLErrors.map(({message}) => <Alert danger>{message}</Alert>)}
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  required
                  value={state.username}
                  onChange={e => this.onInputChangedHandler('username', e.target.value)}
                  placeholder="e.g., Sean Urgel"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  required
                  value={state.email}
                  onChange={e => this.onInputChangedHandler('email', e.target.value)}
                  placeholder="e.g., urgel@company.com"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  required
                  value={state.password}
                  onChange={e => this.onInputChangedHandler('password', e.target.value)}
                  placeholder="e.g., "
                />
              </FormGroup>

              <Button type="submit" disabled={!state.allowSubmit}>
                Create New Account
              </Button>
            </form>
          )
        }}
      </Mutation>
    )
  }
}

export default withApollo(SignupForm)
