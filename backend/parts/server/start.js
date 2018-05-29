module.exports = ({userRoutes, betRoutes, matchRoutes})=>{

  const express = require('express');

  const app = express();

  //client routes
  app.get('/', (q,s)=>s.send('hello world'))

  //restful routes
  app.use('/rest/users', userRoutes)
  app.use('/rest/bets', betRoutes)
  app.use('/rest/matches', matchRoutes)


  app.set('json spaces', '\t')

  app.listen(3001, ()=> console.log('started'))

}
