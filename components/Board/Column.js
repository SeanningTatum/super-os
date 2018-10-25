import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Droppable, Draggable} from 'react-beautiful-dnd'

import InnerList from './InnerList'

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

class Column extends React.Component {
  state = {}

  render() {
    const {column, tasks, index} = this.props

    return (
      <Draggable draggableId={column.id} index={index}>
        {provided => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps} type="task">
              {column.title}
            </Title>
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList tasks={tasks} />

                  {provided.placeholder}
                  <h5>Add Another Card</h5>
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    )
  }
}

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    taskIds: PropTypes.arrayOf(PropTypes.number),
  }),
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
  index: PropTypes.any.isRequired, // eslint-disable-line
}

export default Column
