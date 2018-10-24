import styled, {css} from 'styled-components'

export default styled.input`
  padding: 10px;
  border-radius: 0.3em;
  border: 1px solid rgb(215, 215, 215);
  font-size: 0.9rem;
  width: 100%;
  background-color: rgb(243, 243, 243);

  &:focus {
    outline: none;
  }

  ${props =>
    props.transparent &&
    css`
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 1);
      font-weight: 800;
      &::placeholder {
        color: rgb (255, 255, 255, 0.6);
        font-weight: 800;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }
    `};
`
