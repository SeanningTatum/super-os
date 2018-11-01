import {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Droppable, Draggable} from 'react-beautiful-dnd'

import InnerList from './InnerList'
import AddTask from './AddTask'

export default class Column extends Component {
  static propTypes = {
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
    addTaskToColumn: PropTypes.func.isRequired, // Located in board.js
  }

  constructor(props) {
    super(props)

    this.cancelRef = null
    this.addCardRef = null
    this.addCardButtonRef = null

    this.state = {
      addCard: false,
      input: '', // TODO - find better name
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = event => {
    const {addCard} = this.state

    if (!addCard) return

    if (this.cancelRef && this.cancelRef === event.target) {
      // User clicked the X
      this.closeAddCard()
      this.clearInput()
      document.removeEventListener('mousedown', this.handleClickOutside)
    } else if (this.addCardButtonRef && this.addCardButtonRef === event.target) {
      // User clicked add task
      this.onAddTask()
      document.removeEventListener('mousedown', this.handleClickOutside)
    } else if (this.addCardRef && !this.addCardRef.contains(event.target)) {
      // Clicked anywhere else
      this.closeAddCard()
      document.removeEventListener('mousedown', this.handleClickOutside)
    }
  }

  onAddTask = () => {
    const {addTaskToColumn, column} = this.props
    const {input} = this.state

    const task = {id: Math.floor(Math.random() * Math.floor(100)).toString(), content: input}

    // All logic goes in here including removing
    addTaskToColumn(column.id, task)

    this.closeAddCard()
    this.clearInput()
  }

  onEnterPress = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      this.onAddTask()
    }
  }

  clearInput = () => this.setState({input: ''})

  openAddCard = async () => {
    document.addEventListener('mousedown', this.handleClickOutside)
    await this.setState({addCard: true})
    this.addCardRef.focus()
  }

  taskInputOnChangeHandler = value => this.setState({input: value})

  closeAddCard = () => this.setState({addCard: false})

  render() {
    const {column, index, tasks} = this.props
    const {state} = this

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
                </TaskList>
              )}
            </Droppable>

            {/* Add Card Button */}
            {!state.addCard ? (
              <Footer onClick={this.openAddCard}>
                <span>+ Add another card</span>
              </Footer>
            ) : (
              <AddTask
                addCardButtonRef={node => {
                  this.addCardButtonRef = node
                }}
                addCardRef={node => {
                  this.addCardRef = node
                }}
                cancelRef={node => {
                  this.cancelRef = node
                }}
                onEnterPress={this.onEnterPress}
                taskInputOnChangeHandler={this.taskInputOnChangeHandler}
                inputVal={state.input}
              />
            )}
          </Container>
        )}
      </Draggable>
    )
  }
}

// Styles

const Container = styled.div`
  flex: 0 0 auto;
  margin: 8px;
  width: 250px;
  overflow-y: auto;

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
  padding: 8px 8px 0;
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
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 0px 0px 4px 4px;
    cursor: pointer;
  }
`
