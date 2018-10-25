import React, {Component, Fragment} from 'react'
// import PropTypes from 'prop-types'
// import Head from 'next/head'

import initialData from '../../utils/initData'
import Column from '../../components/Board/Column'

class Board extends Component {
  state = initialData

  render() {
    const {state} = this

    return this.state.columnOrder.map(columnID => {
      const column = state.columns[columnID]
      const tasks = column.taskIds.map(taskID => state.tasks[taskID])

      return <Column key={columnID} column={column} tasks={tasks} />
    })
  }
}

export default Board
