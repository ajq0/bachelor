const _  = require('lodash');
const fs = require('fs-extra');

(async function(){
  let data =  await fs.readJson('./parts/tables/data.json')
  let teams = data.teams
  let matches = _.concat(data.groups,data.knockout)
  let groupMatches = _.reduce(data.groups, (acc, group, val)=>{
    if(val === 'b'){
      acc = _.map(acc.matches, (m)=>{
        return _.assign(m, {group: 'a'})
      })
    }
    return _.concat(acc, _.map(group.matches, (m)=>{
      return _.assign(m, {group: val})
    }))
  })
  //console.log(data.knockout)
  let knockMatches = _.reduce(data.knockout, (acc, round, val)=>{
    if(val === 'round_8'){
      acc = _.map(acc.matches, (m)=>{
        return _.assign(m, {round: acc.name})
      })
    }
    return _.concat(acc, _.map(round.matches, (m)=>{
      return _.assign(m, {round: round.name})
    }))
  })

  let allm = _.concat(groupMatches, knockMatches)
  allm = _.map(allm, m => {

    let match = _.omit(m, ['name', 'home_team', 'away_team'])

    let id = m.name
    let home = teams[m.home_team]? teams[m.home_team].name :m.home_team
    let away = teams[m.away_team]? teams[m.away_team].name :m.away_team

    return _.assign(match, {id:id, home_team:home, away_team:away})
  })

  allm = _.sortBy(allm, 'id')

  let opt = {EOL:'\n', spaces: '\t'}
  fs.writeJson('./parts/tables/allMatches.json',[], opt)
  fs.writeJson('./parts/tables/allMatches.json',allm, opt)
})()
