/**
users api

****each user has following values****
{
  id
  nickname
  score
  bio
  info: {
    username
    token
    creation_time
  }
  bets: []
}

////all json payloads should be set in content-type/////

@ get domain_name/rest/users/

  res body
    json of users list
    {
      id
      nickname
      score
    }

  description
    get all users in a list

@ post domain_name/rest/users/

  req body
    json of new user in following format
    {
      username
      google_token

      //optional//
      nickname
      bio
    }

    description
      create a new user, after he/she has logged into google

@ get domain_name/rest/users/{user_id}

  res body
    json of user with id == user_id, {} if the user doesnt exsist

@ post domain_name/rest/users/{user_id}/

  req header
    authentication = google token

  req body
    json with following values
    {
      //optional//
      username
      nickname
      bio
    }

**** each bet has the following format ****
{
  id                    number
  mode                  'easy' or 'hard'
  bet                   'team_name' or [[home_score, away_score]] respectivly
  match_id              number
}

@ get domain_name/rest/users/{user_id}/bets/
  res body
    json array with bets

@ post domain_name/rest/users/{user_id}/bets/
  req header
    authentication = google token

  req body
    json with new bet
    {
      mode
      match_id
      bet
    }

@ delete domain_name/rest/users/{user_id}/bets/:id
  req header
    authentication = google token

**/
const express = require('express');
const _ = require('lodash')
const middleware = require('./middleware.js')

module.exports = (db)=>{

  const rest = express.Router()

  rest.use(middleware.json)
  rest.use(middleware.authentication)

  rest.param('id', middleware.numberFormat)
  rest.param('bet_id', middleware.numberFormat)

  rest.use(middleware.error)

  ///get and create
  rest.get('/', (req, res)=>{

    res.json(db.getUsers())

  })

  rest.post('/', (req, res)=>{

    const newUser = req.body

    const newUserGoogleId = res.locals.userID

    db.addUser({
      nickname: newUser.nickname,
      bio: newUser.bio,
      googleToken: newUserGoogleId
    })

    res.status(201).send('user created')

  })

  rest.get('/:id', (req, res)=>{

    const userID = req.params.id

    const user = db.getUser(userID)

    console.log(user)

    if(user){

      res.status(200).json(user)

    }else{

      res.status(404).send('user was not found')

    }

  })

  rest.post('/:id', (req, res)=>{

    const userID = req.params.id

    const userGoogleId = res.locals.userID

    const values = req.body

    db.editUser(userID,
      {nickname: values.nickname,
        bio: values.bio
      })

    res.status(200).send('user updated')

  })

  //get and add bets for a user
  rest.get('/:id/bets/', (req,res)=>{

    const userID = req.params.id

    const userBets = db.getBets(userID)

    res.status(200).json(userBets)

  })

  rest.post('/:id/bets/:bet_id', (req, res)=>{

    const userID = req.params.id

    const userGoogleId = res.locals.userID

    const betID = req.params.bet_id

    res.type('plain')

    if(db.addBet(userID, betID)){

      res.status(200).send('user updated')

    }else{

      res.status(400).send('the values given were not accepted of the user was not found')

    }

  })

  rest.delete('/:id/bets/:bet_id', (req, res)=>{

    const userID = req.params.id

    const betID = req.params.bet_id

    const userGoogleId = req.locals.userID

    res.type('plain')

    if(db.deleteBet(userID, betID)){

      res.status(200).send('user updated')

    }else{

      res.status(400).send('the values given were not accepted of the user was not found')

    }

  })

  return rest
}
