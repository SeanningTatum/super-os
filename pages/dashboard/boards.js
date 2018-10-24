import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled from 'styled-components'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

import securedPage from '../../hocs/securePage'
import {Button, Card} from '../../components/UI'
import AddBoardModal from '../../components/Dashboard/AddBoardModal'

export const GET_BOARDS = gql`
  query($user_id: ID!) {
    User(user_id: $user_id) {
      boards {
        name
        id
        background
      }
    }
  }
`

class boards extends React.Component {
  static propTypes = {
    loggedUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }

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
            <Query query={GET_BOARDS} variables={{user_id: props.loggedUser.id}}>
              {({data, error, loading}) => {
                if (error) return <h5>Error</h5>
                if (loading) return <h5>Loading...</h5>

                const {boards} = data.User

                if (boards.length === 0) {
                  return (
                    <NoBoardsContainer>
                      <h3>You have no boards, create one?</h3>
                      <div>
                        <Button small onClick={this.openModal}>
                          Create Board
                        </Button>
                      </div>
                    </NoBoardsContainer>
                  )
                }

                return (
                  <Fragment>
                    <div
                      style={{
                        marginBottom: '1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <h3>Your Boards</h3>
                      <div>
                        <Button small onClick={this.openModal} nomargin>
                          Create Board
                        </Button>
                      </div>
                    </div>
                    <BoardsContainer>
                      {boards.map(board => (
                        <BoardCard style={{backgroundColor: board.background}} key={board.id}>
                          <p>{board.name}</p>
                        </BoardCard>
                      ))}
                    </BoardsContainer>
                  </Fragment>
                )
              }}
            </Query>
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
  padding: 1.5rem;
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

const BoardCard = styled(Card)`
  width: 160px;
  height: 80px;
  margin-right: 20px;
  font-size: 12px;
  font-weight: 700;
  color: white;
`

const BoardsContainer = styled.div`
  display: flex;
`

export default securedPage(boards)
