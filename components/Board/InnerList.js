import React from 'react'
import PropTypes from 'prop-types'

import Task from './Task'

class InnerList extends React.Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ),
  }

  shouldComponentUpdate(nextProps) {
    const {props} = this
    if (nextProps.tasks === props.tasks) {
      return false
    }

    return true
  }

  render() {
    const {tasks} = this.props

    return tasks.map((task, index) => <Task task={task} index={index} key={task.id} />)
  }
}

export default InnerList
