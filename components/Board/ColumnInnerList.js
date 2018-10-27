import {PureComponent} from 'react'
import PropTypes from 'prop-types'

import Column from './Column'

class ColumnInnerList extends PureComponent {
  static propTypes = {
    column: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      taskIds: PropTypes.arrayOf(PropTypes.string),
    }),
    taskMap: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ),
    index: PropTypes.any.isRequired, // eslint-disable-line
    addTaskToColumn: PropTypes.func.isRequired,
  }

  render() {
    const {column, taskMap, index, addTaskToColumn} = this.props
    const tasks = column.taskIds.map(taskID => taskMap[taskID])

    return <Column column={column} tasks={tasks} index={index} addTaskToColumn={addTaskToColumn} />
  }
}

export default ColumnInnerList
