import styled from 'styled-components'
import PropTypes from 'prop-types'

import {Button} from '../UI'

const AddTask = props => {
  const {onEnterPress, taskInputOnChangeHandler, inputVal} = props
  const {addCardRef, addCardButtonRef, cancelRef} = props

  return (
    <AddCardFooter>
      <AddCardTextArea
        ref={addCardRef}
        value={inputVal}
        placeholder="Enter a title for this card..."
        onKeyDown={e => onEnterPress(e)}
        onChange={e => taskInputOnChangeHandler(e.target.value)}
      />
      <SubmitArea>
        <AddCardButton success nomargin small type="submit" ref={addCardButtonRef}>
          Add Card
        </AddCardButton>

        <XCancel ref={cancelRef}>X</XCancel>
      </SubmitArea>
    </AddCardFooter>
  )
}

AddTask.propTypes = {
  onEnterPress: PropTypes.func.isRequired,
  taskInputOnChangeHandler: PropTypes.func.isRequired,
  inputVal: PropTypes.string.isRequired,
  addCardRef: PropTypes.any, // eslint-disable-line
  addCardButtonRef: PropTypes.any, // eslint-disable-line
  cancelRef: PropTypes.any, // eslint-disable-line
}

export default AddTask

const AddCardTextArea = styled.textarea`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border: none;
  border-radius: 4px;
  background-color: white;
  flex-grow: 1;
  resize: none;
  rows: 3;
  font-size: 13px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 13px;
  }
`
const AddCardFooter = styled.div`
  padding: 0 8px 8px;
  display: flex;
  flex-direction: column;
`

const AddCardButton = styled(Button)`
  padding: 7px;
  width: 40%;
  margin-right: 15px;
`

const SubmitArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const XCancel = styled.h5`
  font-weight: 800;
  margin: 0;
  cursor: pointer;
  padding: 3px;

  &:hover {
    color: rgba(0, 0, 0, 0.5);
    font-size: 120%;
  }
`
