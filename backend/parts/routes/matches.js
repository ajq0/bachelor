/**

**** match ****
{
  id
  type
  group
  home_team: {
    id
    name
  }
  away_team: {
    id
    name
  }
  time
  finished
  home_result
  away_result
}

@ get domain_name/rest/matches/

  req body
    {
      //optional//
      finished            boolean
      before_time         js.Date.getTime
      after_time
      home_team
      home_team_id
      away_team
      away_team_id
      group
    }

  res body
    json array with all matches
    {
      id
      home_team
      away_team
      time
      //optional//
      result
    }

  description
    get a list of all matches matching the options send in the req

@ get domain_name/rest/matches/:id

  res body
    json of match with the id == id

  description
    get the full match object with id == id

@ get domain_name/rest/matches/:id/bets

  res body
    json of bet for match with id == id

  description
    gets the bet object, same as the bet object the user gets



**/

const express = require('express');
const middleware = require('./middleware.js')
const _ = require('lodash')

module.exports = (db)=>{

  const rest = express.Router()

  rest.param('id', middleware.numberFormat)

  rest.get('/', (req, res)=>{

    const matches = db.getMatches()

    if(!_.isEmpty(matches)){

      res.status(200).json(matches)

    }else{

      res.status(404).send('there are no matches, which cannot happen, so something is broken')

    }

  })

  rest.get('/:id', (req, res)=>{
    //console.log(db.get('matches', req.params.id))
    const match = db.getMatch(req.params.id)

    console.log(match)

    if(!_.isEmpty(match)){

      res.status(200).json(match)

    }else{

      res.status(404).send('the match doesnt exsist')

    }
  })

  return rest
}
