const _ = require('lodash')

class Users{
  constructor(file){

    //console.log(file)

    this.currentID = file.currentID
    this.data = file.users
    this.edit = Date.now()
    this.open = Date.now()

  }

  getID(){
    let id = this.currentID
    this.currentID++
    return id
  }

  isNotStupid(item){

    return _.every(item, (value, key)=>{

      if(value){

        if(Array.isArray(value)){
          ///all arrays should only contain id values
        }

        if(typeof value === 'string'){
          ///all string should have a maximum length
        }

        if(value === 'number'){
          ///has to be a real whole number
        }
      }

      return false
    })
  }

  getUser(id){

      return _.find(this.data, {id: id})

  }

  getUsers(){

    return this.data || []

  }

  addUser({nickname, bio, googleToken}){

    let id = this.getID(), time = Date.now()

    let user = {

      id: id,
      nickname: nickname || id,
      bio: bio || '',
      creation: time,
      score: 0,
      token: googleToken,
      bets: []

    }

    this.data.push(user)

    this.edit = Date.now()

    return true

  }

  editUser(id, {nickname, bio}){

    let user = this.getUser(id)

    if(nickname && typeof nickname==='string') user.nickname = nickname
    if(bio && typeof nickname==='string') user.bio = bio

    this.edit = Date.now()

    return true

  }

  getBets(userID){

    let user = this.getUser(userID)

    if(user){

      return user.bets

    }else{

      return undefined

    }

  }

  addBet(userID, betID){

    let bets = this.getBets(userID)

    if(bets){

      bets.push(betID)

      return true

    }

    return false

  }

  deleteBet(userID, betID){

    let bets = this.getBets(userID)

    if(bets){

      _.remove(bets, e=> e === betID )

      return true

    }

    return false

  }

}

module.exports = Users
