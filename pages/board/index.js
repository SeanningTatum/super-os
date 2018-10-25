import React, {Component} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'

// import PropTypes from 'prop-types'
// import Head from 'next/head'

import initialData from '../../utils/initData'
import Column from '../../components/Board/Column'

class Board extends Component {
  state = initialData

  onDragEnd = result => {
    // TODO: reorder column
  }

  render() {
    const {state} = this

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {state.columnOrder.map(columnID => {
          const column = state.columns[columnID]
          const tasks = column.taskIds.map(taskID => state.tasks[taskID])

          return <Column key={columnID} column={column} tasks={tasks} />
        })}
      </DragDropContext>
    )
  }
}

export default Board
