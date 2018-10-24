import styled, {css} from 'styled-components'

export default styled.button`
  margin: 2em auto 1em !important;
  box-shadow: 0 2.5px 0 #026bd8;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 1.2;
  border-radius: 0.3em;
  cursor: pointer;
  padding: 0.7em 5em;
  width: 100%;

  background: ${props => props.theme.primary_linear};
  border: ${props => `1px solid ${props.theme.primary}`};

  ${props =>
    props.disabled &&
    css`
      background: grey;
      border: 1px solid grey;
      box-shadow: 0 2.5px darkgrey;
    `};
`
