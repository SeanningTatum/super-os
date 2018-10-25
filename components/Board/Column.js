import React from 'react'
import styled from 'styled-components'
import {Droppable} from 'react-beautiful-dnd'

import Task from './Task'

const Container = styled.div`
  margin: 8px;
  width: 250px;
  border: 1px solid lightgrey;
  border-radius: 2px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`

class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false
    }

    return true
  }

  render() {
    const {tasks} = this.props

    return tasks.map((task, index) => <Task task={task} index={index} key={task.id} />)
  }
}

class Column extends React.Component {
  state = {}

  render() {
    const {column, tasks} = this.props

    return (
      <Container>
        <Title>{column.title}</Title>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <InnerList tasks={tasks} />

              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    )
  }
}

export default Column
