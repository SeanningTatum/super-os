import styled, {css} from 'styled-components'

export default styled.button`
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
  width: 100%;

  ${props =>
    props.disabled &&
    css`
      background: grey;
      border: 1px solid grey;
      box-shadow: 0 2.5px darkgrey;
    `};
`
