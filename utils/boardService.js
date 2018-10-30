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

const UPDATE_TASK_ORDER = gql`
  mutation updateTaskOrder($column_id: ID!, $updated_task_id_arr: [String]!) {
    updateTaskOrder(column_id: $column_id, updated_task_id_arr: $updated_task_id_arr)
  }
`

const MOVE_TASK_TO_NEW_COLUMN = gql`
  mutation moveTaskToNewColumn(
    $start_column_id: ID!
    $start_column_arr: [String!]
    $finish_column_id: ID!
    $finish_column_arr: [String!]
  ) {
    moveTaskToNewColumn(
      start_column_id: $start_column_id
      start_column_arr: $start_column_arr
      finish_column_id: $finish_column_id
      finish_column_arr: $finish_column_arr
    )
  }
`

const UPDATE_COLUMN_ORDER = gql`
  mutation updateColumnOrder($board_id: ID!, $updated_column_order: [String]!) {
    updateColumnOrder(board_id: $board_id, updated_column_order: $updated_column_order) {
      id
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

  async updateColumnOrder(board_id, updated_column_order) {
    this.apolloClient.mutate({
      mutation: UPDATE_COLUMN_ORDER,
      variables: {
        board_id,
        updated_column_order,
      },
    })
  }

  updateTaskOrder(column_id, updated_task_id_arr) {
    this.apolloClient.mutate({
      mutation: UPDATE_TASK_ORDER,
      variables: {
        column_id,
        updated_task_id_arr,
      },
    })
  }

  async moveTaskToOtherColumn(startColumn, finishColumn) {
    const data = await this.apolloClient.mutate({
      mutation: MOVE_TASK_TO_NEW_COLUMN,
      variables: {
        start_column_id: startColumn.id,
        start_column_arr: startColumn.taskIds,
        finish_column_id: finishColumn.id,
        finish_column_arr: finishColumn.taskIds,
      },
    })

    console.log(data)
  }
}
