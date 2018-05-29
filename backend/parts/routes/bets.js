/**

**** bets ****
{
  id                    number
  mode                  'easy' or 'hard'
  bet                   'team_name' or [[home_score, away_score]] respectivly
  match_id              number
  frequency             number of times this bet was made
  closed                boolean
}

@ get domain_name/rest/bets/
  req body
    {
      //optional//
      match_id          number
      closed            boolean
    }

  res body
    {
      easy: [array of easy bets]
      hard: [array of hard bets]
    }

  description
    gets all bets or all gets for match_id or
    all easy bets or all easy bets for match_id etc...

@ get domain_name/rest/bets/:id
  res body
    full bet data of bet with the id == id

**/
const express = require('express');
const _ = require('lodash')
const middleware = require('./middleware.js')

module.exports = (db)=>{

  const rest = express.Router()

  rest.use(middleware.json)

  rest.param('id', middleware.numberFormat)

  rest.get('/', (req, res)=>{

    console.log(req)

    const allbets = db.getBets();

    if(!_.isEmpty(allbets)){

      res.status(200).json(allbets)

    }else{

      res.status(404).send('there are no bets')

    }

  })

  rest.get('/:id', (req, res)=>{

    const betID = req.params.id

    const bet = db.getBet(betID)

    if(bet && !_.isEmpty(bet)){

      res.status(200).json(bet)

    }else{

      res.status(404).send('bet not found')

    }

  })



  return rest
}
