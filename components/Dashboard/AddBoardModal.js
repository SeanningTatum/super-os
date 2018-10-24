import React, {Fragment, PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import {Modal, Card, Button, Input} from '../UI'
import {colors} from '../../utils/constants'

const CREATE_BOARD = gql`
  mutation createBoard($user_id: ID!, $board_name: String!) {
    createBoard(user_id: $user_id, board_name: $board_name) {
      id
      name
      owned_by
    }
  }
`

export default class AddBoardModal extends PureComponent {
  static propTypes = {
    userID: PropTypes.string.isRequired,
  }

  state = {
    backgroundColor: 'rgb(44, 147, 252)',
    validName: false,
    boardName: '',
  }

  componentDidUpdate(_, prevState) {
    const {state} = this
    if (prevState.boardName !== state.boardName) {
      this.setState({validName: this.isBoardNameValid()})
    }
  }

  onCreateBoard = createBoardMutation => {
    const {props, state} = this
    const {boardName} = state

    console.log(boardName, props.userID)

    createBoardMutation({
      variables: {
        board_name: boardName,
        user_id: props.userID,
      },
    })
  }

  isBoardNameValid = () => {
    const {state} = this
    return state.boardName.length > 2
  }

  render() {
    const {props, state} = this

    return (
      <Modal open={props.open} closeModal={props.closeModal}>
        <Mutation mutation={CREATE_BOARD} onCompleted={data => console.log('it is finished', data)}>
          {(createBoard, {data, error}) => (
            <Fragment>
              <Container>
                <AddBoardCard
                  style={{
                    backgroundColor: state.backgroundColor,
                    border: `1px solid ${state.backgroundColor}`,
                  }}
                >
                  <BoardTitleInput
                    placeholder="Add board title"
                    transparent
                    value={state.boardName}
                    onChange={e => this.setState({boardName: e.target.value})}
                  />
                </AddBoardCard>
                <ColorPicker>
                  {colors.map(color => (
                    <Square
                      key={color}
                      style={{backgroundColor: color}}
                      onClick={() => this.setState({backgroundColor: color})}
                    />
                  ))}
                </ColorPicker>
              </Container>

              <div style={{width: '40%', marginTop: '12px'}}>
                <AddBoardButton
                  type="button"
                  success
                  disabled={!state.validName}
                  small
                  nomargin
                  onClick={() => this.onCreateBoard(createBoard)}
                >
                  Create Board
                </AddBoardButton>
              </div>
            </Fragment>
          )}
        </Mutation>
      </Modal>
    )
  }
}

const BoardTitleInput = styled(Input)`
  font-size: 16px;

  &::placeholder {
    font-size: 16px;
  }

  &:disabled {
    color: #97a7b0;
    background: white;
  }
`

const AddBoardButton = styled(Button)`
  box-shadow: none;
  border: none;

  &:disabled {
    border-color: white;
    color: #97a7b0;
    background: white;
  }
`

const Container = styled.div`
  display: flex;
`

const ColorPicker = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0.4;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;
  align-items: center;
`

const Square = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 2px;
  margin-bottom: 8px;
`

const AddBoardCard = styled(Card)`
  height: 96px;
  flex: 1;
  margin-right: 12px;
`