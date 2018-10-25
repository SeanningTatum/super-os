const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/b/:id', (req, res) => {
      const actualPage = '/board'
      const queryParams = {id: req.params.id}
      const {cookie} = req.headers

      // Add code the check if user id is in the board
      console.log(cookie)

      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => handle(req, res))

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
