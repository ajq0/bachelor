const fs = require('fs-extra')
const _ = require('lodash')

const filePaths = {
  users: __dirname + '\\users.json',
  bets: __dirname + '\\bets.json',
  matches: __dirname + '\\allMatches.json'
}

const load = async (filename) => {

  const obj = {}

  obj[filename] = await fs.readJson(filePaths[filename])

  return obj

}

const loadAll = () => {

  return Promise.all(

    _.map( filePaths, (value, key) => {

      return load(key)

    })
  )
  .then(tables => {

    return _.assign({}, ...tables)

  }, err => console.log(err))
}

const save = async (filename, object) => {

  try{

    const opt = {EOL:'\n', spaces: '\t'};

    await fs.writeJson(filePaths[filename], object, opt)

  }catch(err){

    console.log('couldnt save file' + filename)

  }

}

module.exports = {load, loadAll, save}
