import styled, {css} from 'styled-components'

export default styled.div`
  padding: 0.75rem 1.25rem;
  margin: 1rem 0;
  border: 1px solid transparent;
  border-radius: 0.25rem;

  ${props =>
    props.danger &&
    css`
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    `};
`
