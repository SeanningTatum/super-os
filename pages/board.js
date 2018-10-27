import {Component, Fragment} from 'react'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Head from 'next/head'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

import initialData from '../utils/initData'
import ColumnInnerList from '../components/Board/ColumnInnerList'
import securePage from '../hocs/securePage'

const GET_BOARD = gql`
  query($board_id: ID!) {
    Board(board_id: $board_id) {
      id
      name
      background
    }
  }
`

class Board extends Component {
  static getInitialProps({query}) {
    return {board_id: query.id}
  }

  static propTypes = {
    board_id: PropTypes.string.isRequired,
  }

  state = {
    ...initialData,
  }

  onDragEnd = result => {
    const {destination, source, draggableId, type} = result
    const {state} = this

    // User did not put Draggable into a Droppable
    if (!destination) return

    // If User just put the Draggable in the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    if (type === 'column') {
      const newColumnOrder = [...state.columnOrder]
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      }
      this.setState(newState)
      return
    }

    // Fetch the column
    const start = state.columns[source.droppableId]
    const finish = state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = [...start.taskIds]

      // Remove the item
      newTaskIds.splice(source.index, 1)
      // Insert the item to destination.index
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      }

      this.setState(newState)
      return
    }

    // Moving from one list to another
    const startTaskIds = [...start.taskIds]
    // Remove from source
    startTaskIds.splice(source.index, 1)

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = [...finish.taskIds]
    // Insert to destination
    finishTaskIds.splice(destination.index, 0, draggableId)

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [start.id]: newStart,
        [finish.id]: newFinish,
      },
    }

    this.setState(newState)
  }

  addTaskToColumn = (columnID, newTask) => {
    const {state} = this

    const updatedColumn = {...state.columns[columnID]}
    updatedColumn.taskIds = [...updatedColumn.taskIds, newTask.id]

    const newState = {
      ...state,
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask,
      },
      columns: {
        ...state.columns,
        [columnID]: updatedColumn,
      },
    }

    this.setState(newState)
  }

  render() {
    const {state, props} = this

    return (
      <Query query={GET_BOARD} variables={{board_id: props.board_id}}>
        {({data, error, loading}) => {
          if (loading) return <h5>Loading...</h5>

          const {Board} = data

          return (
            <Fragment>
              <Head>
                <title>{`${Board.name} | Super OS` || 'Super OS'}</title>
              </Head>
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column">
                  {provided => (
                    <Container ref={provided.innerRef} {...provided.droppableProps}>
                      {state.columnOrder.map((columnID, index) => {
                        const column = state.columns[columnID]
                        return (
                          <ColumnInnerList
                            key={column.id}
                            column={column}
                            taskMap={state.tasks}
                            index={index}
                            addTaskToColumn={this.addTaskToColumn}
                          />
                        )
                      })}
                      {provided.placeholder}
                    </Container>
                  )}
                </Droppable>
              </DragDropContext>

              <style global="true">{`
                body {
                  background-color: ${Board.background};
                }
              `}</style>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`

export default securePage(Board)
