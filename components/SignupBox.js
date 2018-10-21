import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import AuthService from '../utils/authService'
import redirect from '../lib/redirect'

const REGISTER = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
      register(email: $email, username: $username, password: $password)
  }
`

const SignUpBox = ({client}) => {

  let username, password, email

  
  return (
    <Mutation mutation={REGISTER} onCompleted={data => {
      const token = data.register

      AuthService.setToken(token, token)
      client.cache.reset().then(() => {
        redirect({}, '/')
      })
    }}>
        {(register, {data, error}) => (
          <form onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            

            console.log('in here', username.value, password.value, email.value)

            register({
              variables: {
                username:username.value ,
                password:password.value , 
                email:email.value 
              }
            })
          }}>


            <input type="text" ref={node => {username = node}} placeholder="username"/>
            <br/>
            <input type="text" ref={node => {password = node}} placeholder="password"/>
            <br/>
            <input type="text" ref={node => {email = node}} placeholder="email"/>
            <br/>
            <button>Register</button>
          </form>
        )}
    </Mutation>
  )
}

export default withApollo(SignUpBox)