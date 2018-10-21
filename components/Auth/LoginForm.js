import React from 'react'
import styled from 'styled-components'

const LoginForm = () => (
  <LoginContainer>
    <form>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="email" required />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input type="password" required />
      </FormGroup>

      <SubmitButton>Log In</SubmitButton>
    </form>
  </LoginContainer>
)

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

export default LoginForm
