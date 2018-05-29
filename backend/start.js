

let {load, loadAll, save} = require('./parts/tables/load.js')

const {UserDB, BetDB, MatchDB} = require('./parts/database/start.js')

const {getUserRouter, getBetsRouter, getMatchesRouter} = require('./parts/routes/routes.js')

const startServer = require('./parts/server/start.js')



loadAll()
.then( tables => {

  const usersDB = new UserDB(tables.users)
  const betsDB = new BetDB(tables.bets)
  const matchesDB = new MatchDB(tables.matches)

  const userRoutes = getUserRouter(usersDB)
  const betRoutes = getBetsRouter(betsDB)
  const matchRoutes = getMatchesRouter(matchesDB)


  startServer({userRoutes, betRoutes, matchRoutes})

})
.then( () => {

  //settimeout the save filefunction, maybe a saveall

})
