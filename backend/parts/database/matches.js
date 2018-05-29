const _ = require('lodash')

class Matches{

  constructor(file){

    this.data = file

  }

  getMatches(){
    return this.data || []
  }

  getMatch(id){
    return _.find(this.data, {id: id})
  }

}

module.exports = Matches
