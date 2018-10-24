import styled, {css} from 'styled-components'

export default styled.div`
  padding: 1rem;
  border-radius: 3px;
  background-color: ${props => props.theme.contrast};
  box-shadow: ${props => props.theme.boxshadow};

  ${props =>
    props.nopadding &&
    css`
      padding: 0;
    `};
`
