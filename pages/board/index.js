import React, {Component, Fragment} from 'react'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'
import Head from 'next/head'

import initialData from '../../utils/initData'
import ColumnInnerList from '../../components/Board/ColumnInnerList'

class Board extends Component {
  state = {
    ...initialData,
    pageTitle: 'Practice Board',
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

  render() {
    const {state} = this

    return (
      <Fragment>
        <Head>
          <title>{state.pageTitle}</title>
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
                    />
                  )
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </Fragment>
    )
  }
}

const Container = styled.div`
  display: flex;
`

export default Board
