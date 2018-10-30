import {PureComponent, Fragment} from 'react'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Head from 'next/head'
import {withApollo} from 'react-apollo'

import ColumnInnerList from '../components/Board/ColumnInnerList'
import securePage from '../hocs/securePage'
import BoardService from '../utils/boardService'

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

    this.state = {
      tasks: {},
      columns: {},
      columnOrder: [],
      loading: true,
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

  mapColumnsAndTasks = (columns, tasks) => {
    const {state} = this

    const columnsMap = columns.reduce(
      (obj, item) => ((obj[item.id] = {...item}), obj),
      state.columns
    )
    const tasksMap = tasks.reduce((obj, item) => ((obj[item.id] = {...item}), obj), state.tasks)

    return {columnsMap, tasksMap}
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
export default securePage(withApollo(Board))
