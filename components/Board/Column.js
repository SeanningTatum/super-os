import {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Droppable, Draggable} from 'react-beautiful-dnd'

import {Button} from '../UI'

import InnerList from './InnerList'

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

    if (addCard && this.cancelRef && this.cancelRef === event.target) {
      // User clicked the X
      this.closeAddCard()
      this.clearInput()
      document.removeEventListener('mousedown', this.handleClickOutside)
    } else if (addCard && this.addCardButtonRef && this.addCardButtonRef === event.target) {
      // User clicked add task
      this.onAddTask()
      document.removeEventListener('mousedown', this.handleClickOutside)
    } else if (addCard && this.addCardRef && !this.addCardRef.contains(event.target)) {
      // Clicked anywhere else
      this.closeAddCard()
      document.removeEventListener('mousedown', this.handleClickOutside)
    }
  }

  onAddTask = () => {
    const {addTaskToColumn, column} = this.props
    const {input} = this.state

    const task = {id: Math.floor(Math.random() * Math.floor(100)).toString(), content: input}

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

  openAddCard = () => {
    document.addEventListener('mousedown', this.handleClickOutside)
    this.setState({addCard: true})
  }

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
                <span>Add another card</span>
              </Footer>
            ) : (
              <AddCardFooter>
                <AddCardTextArea
                  ref={node => {
                    this.addCardRef = node
                  }}
                  value={state.input}
                  placeholder="Enter a title for this card..."
                  onKeyDown={e => this.onEnterPress(e)}
                  onChange={e => this.setState({input: e.target.value})}
                />
                <SubmitArea>
                  <AddCardButton
                    success
                    nomargin
                    small
                    type="submit"
                    ref={node => {
                      this.addCardButtonRef = node
                    }}
                  >
                    Add Card
                  </AddCardButton>

                  <XCancel
                    ref={node => {
                      this.cancelRef = node
                    }}
                  >
                    X
                  </XCancel>
                </SubmitArea>
              </AddCardFooter>
            )}
          </Container>
        )}
      </Draggable>
    )
  }
}

// Styles

const Container = styled.div`
  margin: 8px;
  width: 250px;

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

const AddCardTextArea = styled.textarea`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border: none;
  border-radius: 4px;
  background-color: white;
  flex-grow: 1;
  resize: none;
  rows: 3;
  font-size: 13px;

  &::placeholder {
    font-size: 13px;
  }
`
const AddCardFooter = styled.div`
  padding: 0 8px 8px;
  display: flex;
  flex-direction: column;
`

const AddCardButton = styled(Button)`
  padding: 7px;
  width: 40%;
  margin-right: 15px;
`

const SubmitArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const XCancel = styled.h5`
  font-weight: 800;
  margin: 0;
  cursor: pointer;
  padding: 3px;

  &:hover {
    color: rgba(0, 0, 0, 0.5);
    font-size: 120%;
  }
`
