import React, {Fragment} from 'react'
import styled from 'styled-components'

import securedPage from '../../hocs/securePage'
import {Button, Card, Modal, Input, Label} from '../../components/UI'

class boards extends React.Component {
  state = {
    showModal: false,
  }

  closeModal = () => this.setState({showModal: false})

  openModal = () => this.setState({showModal: true})

  render() {
    const {state} = this
    return (
      <Fragment>
        <Card style={{height: '100%'}}>
          <Wrapper>
            <NoBoardsContainer>
              <h3>You have no boards, create one?</h3>
              <div>
                <Button small onClick={this.openModal}>
                  Create Board
                </Button>
              </div>
            </NoBoardsContainer>
          </Wrapper>
        </Card>
        {/* Modal */}
        <Modal open={state.showModal} closeModal={this.closeModal}>
          <Card>
            <Input placeholder="Add board title" />
          </Card>
        </Modal>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`

const NoBoardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-weight: 400;
`

export default securedPage(boards)
