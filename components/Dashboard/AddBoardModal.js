import React from 'react'
import styled from 'styled-components'

import {Modal, Card, Button, Input} from '../UI'
import {colors} from '../../utils/constants'

export default class AddBoardModal extends React.Component {
  state = {
    backgroundColor: 'rgb(44, 147, 252)',
  }

  render() {
    const {props, state} = this

    return (
      <Modal open={props.open} closeModal={props.closeModal}>
        <Container>
          <AddBoardCard
            style={{
              backgroundColor: state.backgroundColor,
              border: `1px solid ${state.backgroundColor}`,
            }}
          >
            <BoardTitleInput placeholder="Add board title" transparent />
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
          <Button success small nomargin>
            Create Board
          </Button>
        </div>
      </Modal>
    )
  }
}

const BoardTitleInput = styled(Input)`
  font-size: 16px;

  &::placeholder {
    font-size: 16px;
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
