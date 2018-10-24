import React, {Fragment} from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import securedPage from '../../hocs/securePage'
import {Button, Card} from '../../components/UI'
import AddBoardModal from '../../components/Dashboard/AddBoardModal'

class boards extends React.Component {
  state = {
    showModal: false,
  }

  closeModal = () => this.setState({showModal: false})

  openModal = () => this.setState({showModal: true})

  render() {
    const {state, props} = this

    return (
      <Fragment>
        <Head>
          <title>Boards</title>
        </Head>
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
        <AddBoardModal
          closeModal={this.closeModal}
          open={state.showModal}
          userID={props.loggedUser.id}
        />
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
