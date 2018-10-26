import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Droppable, Draggable} from 'react-beautiful-dnd'

import InnerList from './InnerList'

const Column = ({column, index, tasks}) => (
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
            </TaskList>
          )}
        </Droppable>
        <Footer>
          <span>Add another card</span>
        </Footer>
      </Container>
    )}
  </Draggable>
)

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    taskIds: PropTypes.arrayOf(PropTypes.string),
  }),
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
  index: PropTypes.any.isRequired, // eslint-disable-line
}

const Container = styled.div`
  margin: 8px;
  width: 250px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  background-color: #dfe3e6;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 12px 10px 8px;
  font-weight: 700;
  font-size: 14px;
`
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'lightgrey' : '#dfe3e6')};
  flex-grow: 1;
  min-height: 30px;
`

const Footer = styled.div`
  padding: 10px 15px 8px;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`

export default Column
