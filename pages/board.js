import {PureComponent, Fragment} from 'react'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Head from 'next/head'
import {withApollo} from 'react-apollo'

import ColumnInnerList from '../components/Board/ColumnInnerList'
import securePage from '../hocs/securePage'
import BoardService from '../utils/boardService'
import AddColumn from '../components/Board/AddColumn'

class Board extends PureComponent {
  static getInitialProps({query}) {
    return {board_id: query.id}
  }

  static propTypes = {
    board_id: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.boardService = new BoardService(props.client)

    this.inputRef = null
    this.addColRef = null

    this.state = {
      tasks: {},
      columns: {},
      columnOrder: [],
      loading: true,
      addingColumn: false,
    }
  }

  async componentDidMount() {
    const {board_id} = this.props

    const board = await this.boardService.getBoard(board_id)

    const {columns, tasks, columnOrder, name, background} = board

    const {columnsMap, tasksMap} = this.mapColumnsAndTasks(columns, tasks)

    this.setState({
      columnOrder,
      columns: columnsMap,
      tasks: tasksMap,
      boardName: name,
      backgroundColor: background,
      loading: false,
    })
  }

  onDragEnd = result => {
    const {destination, source, draggableId, type} = result
    const {state} = this

    // User did not put Draggable into a Droppable
    if (!destination) return

    // If User just put the Draggable in the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    // Moving Column
    if (type === 'column') {
      const {board_id} = this.props

      const newColumnOrder = [...state.columnOrder]
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      this.boardService.updateColumnOrder(board_id, newColumnOrder)

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      }
      this.setState(newState)
      return
    }

    // Fetch the column
    const start = state.columns[source.droppableId]
    const finish = state.columns[destination.droppableId]

    // Rearranging task in same column
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

      this.boardService.updateTaskOrder(newColumn.id, newTaskIds)

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

    // Moving task from one list to another
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

    this.boardService.moveTaskToOtherColumn(newStart, newFinish)

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

  handleClick = event => {
    const {inputRef, addColRef, state} = this
    const {addingColumn} = state

    if (!addingColumn) return

    if (event.target === addColRef) {
      this.setState({addingColumn: false})
      document.removeEventListener('mousedown', this.handleClick)
      this.addColumn(inputRef.value)
    } else if (inputRef && !this.inputRef.contains(event.target)) {
      this.setState({addingColumn: false})

      document.removeEventListener('mousedown', this.handleClick)
    }
  }

  onEnterPress = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      this.addColumn(this.inputRef.value)
    }
  }

  toggleAddingColumn = async () => {
    document.addEventListener('mousedown', this.handleClick)
    await this.setState({addingColumn: true})
    this.inputRef.focus()
  }

  mapColumnsAndTasks = (columns, tasks) => {
    const columnsMap = columns.reduce((obj, item) => ((obj[item.id] = {...item}), obj), {})
    const tasksMap = tasks.reduce((obj, item) => ((obj[item.id] = {...item}), obj), {})

    return {columnsMap, tasksMap}
  }

  addColumn = columnName => {
    const {board_id} = this.props
    const {state} = this
    const tempID = Math.floor(Math.random() * 10).toString()

    this.boardService
      .createColumn(columnName, board_id)
      .then(({data}) => {
        const column = data.createColumn
        const newState = {...state}
        console.log(column)

        // Delete column
        delete newState.columns[tempID]
        // Delete from column order
        const index = newState.columnOrder.indexOf(tempID)
        if (index !== -1) newState.columnOrder.splice(index, 1)

        // Update with data from server
        const updatedColumnOrder = [...newState.columnOrder, column.id]

        const updatedColumns = {...newState.columns}
        updatedColumns[column.id] = {...column}

        this.setState({columns: updatedColumns, columnOrder: updatedColumnOrder})
        console.log(newState)
      })
      .catch(error => {
        console.error(error)
      })

    // Optimistic Update
    const {columns, columnOrder} = this.state
    const updatedColumns = {...columns}

    updatedColumns[tempID] = {id: tempID, title: columnName, taskIds: []}
    const updatedColumnOrder = [...columnOrder, tempID]

    this.inputRef.value = ''

    this.setState({columns: updatedColumns, columnOrder: updatedColumnOrder, addingColumn: false})
  }

  addTaskToColumn = (columnID, newTask) => {
    const {state, props} = this

    const {board_id} = props

    // Logic to save to backend and delete optimistic update here
    this.boardService
      .addTaskToColumn(newTask, columnID, board_id, state)
      .then(newState => this.setState(newState))

    // Optimistic Update
    const updatedColumn = {...state.columns[columnID]}
    updatedColumn.taskIds = [...updatedColumn.taskIds, newTask.id]

    const newState = {
      ...state,
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask,
      },
      columns: {
        ...state.columns,
        [columnID]: updatedColumn,
      },
    }

    this.setState(newState)
  }

  render() {
    const {state} = this

    if (state.loading) return <h5>Loading...</h5>

    return (
      <Fragment>
        <Head>
          <title>{`${state.boardName} | Super OS` || 'Super OS'}</title>
        </Head>
        <Header>
          <BoardTitle>{state.boardName}</BoardTitle>
        </Header>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {provided => (
              <Container ref={provided.innerRef} {...provided.droppableProps}>
                {state.columnOrder.map((columnID, index) => {
                  const column = state.columns[columnID]

                  return (
                    <ColumnInnerList
                      key={column.id}
                      column={column}
                      taskMap={state.tasks}
                      index={index}
                      addTaskToColumn={this.addTaskToColumn}
                    />
                  )
                })}

                {/* Add Column */}

                {!state.addingColumn ? (
                  <NoColumn onClick={this.toggleAddingColumn}>
                    <WhiteText>+ Add list</WhiteText>
                  </NoColumn>
                ) : (
                  <AddColumn
                    inputRef={node => {
                      this.inputRef = node
                    }}
                    addColRef={node => {
                      this.addColRef = node
                    }}
                    onEnterPress={this.onEnterPress}
                  />
                )}

                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>

        <style global="true">{`
          body {
            background-color: ${state.backgroundColor};
          }
        `}</style>
      </Fragment>
    )
  }
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  white-space: nowrap;
  overflow: auto;
  height: 100vh;
`

const Header = styled.div`
  height: 50px;
  /* background-color: rgba(0, 0, 0, 0.2); */
  padding: 8px 16px;
  display: flex;
  align-items: center;
`
const BoardTitle = styled.h3`
  color: white;
  font-weight: 700;
  font-size: 16px;
`
const NoColumn = styled.div`
  flex: 0 0 auto;

  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border-radius: 4px;
  height: 40px;

  margin: 8px;
  width: 250px;

  border-radius: 4px;

  display: flex;

  align-items: center;
  padding: 0 1rem;
  cursor: pointer;
  z-index: 100;
`

const WhiteText = styled.h5`
  color: white;
`

export default securePage(withApollo(Board))
