import fifaMatchesJson from './data.json'
import _ from 'lodash'

parse(fifaMatchesJson)

function getMatches(){
  return parse(fifaMatchesJson);
}

function parse(json){
  //console.log(json)
  let teams = _.map(json.teams, (m)=>{
    return {
      nn: m.iso2 === 'gb-eng' ? 'eng' : m.iso2,
      id: m.id,
      name: m.name
    }
  })
  const sT = _.sortBy(teams, ['id'])
  //console.log(sT)
  let matches = []

  ///get group matches
  _.forOwn(json.groups, (val, key)=>{
    _.forEach(val.matches, (m)=>{
      matches.push({
        num: m.name,
        home: sT[m.home_team - 1]
        ? sT[m.home_team-1].name
        : 'not determined yet',
        away:sT[m.away_team - 1]
        ? sT[m.away_team-1].name
        : 'not determined yet',
        name: 'Group ' + key.toUpperCase(),
        type: m.type,
        date: new Date(m.date)
      })
    })
  })

  ///get knockout matches
  _.forOwn(json.knockout, (val, key)=>{
    _.forEach(val.matches, (m)=>{
      matches.push({
        num: m.name,
        home: sT[m.home_team - 1]
        ? sT[m.home_team-1].name
        : 'not determined yet',
        away:sT[m.away_team - 1]
        ? sT[m.away_team-1].name
        : 'not determined yet',
        name: val.name,
        type: key,
        date: new Date(m.date)
      })
    })
  })

  let matchesByDate = _.reduce(_.sortBy(matches, ['date']), (acc,val, index)=>{
    if(index === 1){
      acc = [{dateString: acc.date.toDateString(), date: acc.date, matches: [acc]}]
    }
    if(acc[acc.length-1].dateString === val.date.toDateString()){
      acc[acc.length-1].matches.push(val)
    }else{
      acc.push({dateString: val.date.toDateString(), date: val.date, matches:[val]})
    }
    return acc
  })
  //console.log(matchesByDate)
  return {matches: matchesByDate,
          players: [],
          topPlayers: [],
          upcomingMatches: []}
}

export {getMatches}
