const express = require('express');

const userRouter = require('./restful/users.js')
const betsRouter = require('./restful/bets.js')
const matchesRouter = require('./restful/matches.js')

module.exports = (db)=>{

  const rootRouter = express.Router()

  ///root
  rootRouter.get('/', (q,s)=>{
    s.send(db.tables)
  })

  rootRouter.use('/users', userRouter(db.users))
  //rootRouter.use('/bets', betsRouter(db))
  //rootRouter.use('/matches', matchesRouter(db))

  rootRouter.use((err, req, res, next)=>{

    console.error(err)
    res.status(400).send('internal error')

  })

  return rootRouter
}
