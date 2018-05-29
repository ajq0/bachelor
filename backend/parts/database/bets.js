const _ = require('lodash')

class Bets{

  constructor(file){

    this.data = file.bets
    this.currentID = file.currentID

  }



  getBets(){
    return this.data || []
  }

  getBet(id){
    return _.find(this.data, {id: id})
  }

  addBet(values){



  }

  removeBet(id){

    //for now no bets can be removed

  }

}

module.exports = Bets
