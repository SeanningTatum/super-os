import styled from 'styled-components'
import PropTypes from 'prop-types'

import {Button, Input} from '../UI'

const AddColumn = ({inputRef, addColRef, onEnterPress}) => (
  <Container>
    <AddColInput ref={inputRef} onKeyDown={e => onEnterPress(e)} />

    <AddColButton small nomargin success ref={addColRef}>
      Add List
    </AddColButton>
  </Container>
)

AddColumn.propTypes = {
  inputRef: PropTypes.any, // eslint-disable-line
  addColRef: PropTypes.any, // eslint-disable-line
  onEnterPress: PropTypes.func,
}

export default AddColumn

const Container = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: #dfe3e6;
  height: 86px;

  padding: 5px;

  margin: 8px;
  width: 250px;
`

const AddColButton = styled(Button)`
  padding: 7px;
  width: 40%;
  margin-right: 15px;
`
const AddColInput = styled(Input)`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border: none;

  background-color: white;
  flex-grow: 1;

  font-size: 13px;

  &::placeholder {
    font-size: 13px;
  }
`
