import gql from 'graphql-tag'

const GET_BOARD = gql`
  query($board_id: ID!) {
    Board(board_id: $board_id) {
      id
      name
      background

      columns {
        id
        title
        taskIds
      }

      tasks {
        id
        content
      }

      columnOrder
    }
  }
`
const CREATE_TASK = gql`
  mutation AddTodo($content: String!, $board_id: ID!, $column_id: ID!) {
    createTask(content: $content, board_id: $board_id, column_id: $column_id) {
      id
      content
    }
  }
`

export default class BoardService {
  constructor(client) {
    this.apolloClient = client
  }

  async getBoard(board_id) {
    const {data} = await this.apolloClient.query({
      query: GET_BOARD,
      variables: {
        board_id,
      },
    })
    return data.Board
  }

  async addTaskToColumn(newTask, columnID, board_id, state) {
    const tempState = {...state}

    const {data} = await this.apolloClient.mutate({
      mutation: CREATE_TASK,
      variables: {
        content: newTask.content,
        column_id: columnID,
        board_id,
      },
    })

    const task = {...data.createTask}

    // Delete optimistically added task
    delete tempState.tasks[newTask.id]
    delete tempState.columns[columnID].taskIds[newTask.id]

    // Replace task with actual data from server
    const updatedColumn = {...tempState.columns[columnID]}
    updatedColumn.taskIds = [...updatedColumn.taskIds, task.id]

    const newState = {
      ...tempState,
      tasks: {
        ...tempState.tasks,
        [task.id]: task,
      },
      columns: {
        ...tempState.columns,
        [columnID]: updatedColumn,
      },
    }

    return newState
  }

  async updateColumnOrder() {
    // TODO
  }

  async updateTaskOrder() {
    // TODO
  }
}
