import React, {Component} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
// import Head from 'next/head'

import initialData from '../../utils/initData'
import Column from '../../components/Board/Column'

class Board extends Component {
  state = initialData

  onDragEnd = result => {
    const {destination, source, draggableId} = result
    const {state} = this

    // User did not put Draggable into a Droppable
    if (!destination) return

    // If User just put the Draggable in the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

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

  onDragStart = start => {}

  onDragUpdate = update => {}

  render() {
    const {state} = this

    return (
      <Container>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
        >
          {state.columnOrder.map(columnID => {
            const column = state.columns[columnID]
            const tasks = column.taskIds.map(taskID => state.tasks[taskID])

            return <Column key={columnID} column={column} tasks={tasks} />
          })}
        </DragDropContext>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
`

export default Board
