import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {getMatches} from './data.js'
//import registerServiceWorker from './registerServiceWorker';

class Menu extends Component{
  render(){
    return(
      <ul className='menu-ul'>
        {this.props.items.map((i)=>{
          return (
            <li className={i.sel? 'menu-li-selected' : 'menu-li'}
              key={i.name}
              onClick={i.onClick}>
              {i.name}
            </li>)
        })}
      </ul>
    )
  }
}

class Login extends Component{
  render(){
    return(
      <React.Fragment>
        {this.props.loggedIn &&
          <React.Fragment>
            <ul id='user-info-ul'>
              <li className='user-info-li'>
                username <p className='user-info-p'>{this.props.user.name}</p>
              </li>
              <li className='user-info-li'>
                points <p className='user-info-p'>{this.props.user.points}</p>
              </li>
              <li className='user-info-li'>
                team <p className='user-info-p'>{this.props.user.team}</p>
              </li>
              <li className='user-bets'>

              </li>
              <li className='user-bets'>
                sdfsd
              </li>
            </ul>

          </React.Fragment>
        }
        {!this.props.loggedIn &&
          <button id='login-button' onClick={this.props.login}>Login</button>
        }
      </React.Fragment>
    )
  }
}
class User extends Component{
  render(){
    return(<div className='card'>USER</div>)
  }
}

class Home extends Component{
  render(){
    return(
      <React.Fragment>
        <div className='card'>

          <h1 className='title title-large'>Temporary Name</h1>
          <p className='info'>
            sdcfjhsdajkfsdhajkdfhjkdafhjkfsahjkdfhjkashjkfshadjkh
          </p>
          <img alt='fifaicon' className='icon'></img>
        </div>

        <div className='card'>
          <div className='title'>Top Scorers</div>
          <table className='tb'>
            <thead>
              <tr>
                <td className='tb-h tb-c tb-small'>place</td>
                <td className='tb-h tb-l'>name</td>
                <td className='tb-h tb-r tb-small'>score</td>
                <td className='tb-h tb-r tb-small'>team</td>
              </tr>
            </thead>
            <tbody>
              {this.props.top.map((p)=>{
                return (<tr key={p.place}>
                  <td className='tb-c tb-small'>{p.place}</td>
                  <td className='tb-l tb-large'>{p.name}</td>
                  <td className='tb-r tb-small'>{p.points}</td>
                  <td className='tb-r tb-small'>{p.team}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
        <div className='card'>
          <span className='title'>Upcoming Matches</span>
          <table className='tb'>
            <tbody>
              {this.props.up.map((d)=>{
                return(
                  <React.Fragment key={d.date}>
                    <tr>
                      <td className='tb-c tb-h tb-bt tb-large' colSpan="3">
                        {d.date.getDate() + ' / ' + d.date.getMonth()}
                      </td>
                    </tr>
                    {d.games.map((m)=>{
                      return(
                        <tr key={m.num} onClick={()=>this.props.openMatch(m.num)}>
                          <td className='tb-med tb-r tb-large'>{m.home}</td>
                          <td className='tb-med tb-small tb-c'>vs</td>
                          <td className='tb-med tb-l tb-large'>{m.away}</td>
                        </tr>
                      )
                    })}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }
}

class Leaderboard extends Component{
  render(){
    return(
      <div className='card'>
        <span className='title'>Leaderboards</span>
        <p className='info'> you can view all players who have
          ever made a bet in this game and their score, you are on
          here too, see what rank you have
        </p>
        <table className='tb'>
          <tbody>
            <tr>
              <td className='tb-h'>Position</td>
              <td className='tb-h'>Name</td>
              <td className='tb-h'>Points</td>
            </tr>
            {this.props.data.map((p)=>{
              return(
                <tr key={p.place}>
                  <td className='td-l tb-small'>{p.place}</td>
                  <td className='td-l tb-med tb-large'>{p.name}</td>
                  <td className='td-r tb-small'>{p.points}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

class Matches extends Component{
  renderAllMatches(props){
    return(
      <div className='card'>
        <span className='title'>All the World Cup Matches</span>
        <p className='info'>select a match to start betting</p>
        <table className='tb'>
          <tbody>
            {this.props.data.map((d)=>{
              return(
                <React.Fragment key={d.dateString}>
                  <tr>
                    <td className='tb-c tb-h tb-bt tb-large' colSpan='3'>
                      {d.dateString}
                    </td>
                  </tr>
                  {d.matches.map((m)=>{
                    return(
                      <tr key={m.num} onClick={()=> {
                        this.props.openMatch(m.num)
                      }}>
                        <td className='tb-med tb-r tb-large'>{m.home}</td>
                        <td className='tb-med tb-small tb-c'>vs</td>
                        <td className='tb-med tb-l tb-large'>{m.away}</td>
                      </tr>
                    )
                  })}
                </React.Fragment>)
            })}
          </tbody>
        </table>
      </div>
    )
  }
  render(){
    if(this.props.sel === -1){
      return this.renderAllMatches()
    }else{
      return(<Match sel={this.props.sel} data={this.props.data}
        back={() => this.props.openMatch(-1)}/>)
    }
  }
}

class Match extends Component{
  constructor(props){
    super(props);
    this.state={
      easy: 0,
      bets: [
      {
        name: 'Score? 4points',
        info: 'bet how the score will look'+
        'like at the end of the match'
      },
      {
        name: 'Handicap? 2points',
        info: 'bet how the goal difference' +
        'will look like (2:0 means the left team will' +
        'have 2 more goals that the right team)'
      },
      {
        name: 'goals',
        info: 'Goals: how many goals were scored in total?'
      }
    ]}
  }
  render(){
    return(
      <React.Fragment>
        <button className='back'
          onClick={()=> this.props.back()}>Back
        </button>
        {this.props.data.map((m)=>{
          return m.matches
        }).reduce((a, v)=> a.concat(v)).filter((m)=>{
          return m.num === this.props.sel
        }).map((m)=>{
          return(
            <React.Fragment key={m.num}>
              <div className='card'>
                <div className='title title-large'>
                  <img alt={m.home} src='none'/>
                  {m.home} vs {m.away}
                  <img alt={m.away} src='none'/>
                </div>

                <p className='info'>some info about the match</p>
              </div>

              <div className='card'>
                <div className='title'>Easy Mode</div>
                <p className='info'>bet on the winner of this match,
                if the team that you bet on wins, you get 2 points</p>
                <div className='bet'>
                  <button className={'bet-sel' + (this.state.easy===1?' bet-selected':'')} onClick={()=>this.setState({easy:1})}>{m.home}</button>
                  <button className={'bet-sel' + (this.state.easy===2?' bet-selected':'')} onClick={()=>this.setState({easy:2})}>{m.away}</button>
                  <button className='bet-go' onClick={()=>this.setState({easy:0})}>BET</button>
                </div>
              </div>


              <div className='card'>
                <div className='title'>Hard Mode</div>

                {this.state.bets.map((b)=>{
                  return(
                    <React.Fragment key={b.name}>
                      <p className='info'>{b.info}</p>
                      <div className='bet'>
                        <img alt='flag' className='bet-flag'/>
                        <input type='number' style={{textAlign:'right'}} className='bet-sel bet-field'/>
                        :
                        <input type='number' className='bet-sel bet-field'/>
                        <img alt='flag' className='bet-flag'/>
                      </div>
                    </React.Fragment>
                  )
                })}
                <button className='bet-go'>BET</button>
              </div>
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  }
}

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      menuItems: [
        {name: 'Home'},
        {name: 'Matches'},
        {name: 'Leaderboards'},
        {name: 'User'}
      ],
      mSel: 'Matches',
      matSel:1,
      logged: false,
      user: {name: 'John', points: 2000, team:'Germany'},
      topPlayers: this.props.data.players,
      upcoming: [
        {date: new Date('June 15'), games:[
          {num: 1, home: 'Germany', away: 'Russia'},
          {num: 2, home: 'Italy', away: 'Sweden'}
        ]},
        {date: new Date('June 16'), games:[
          {num:3, home: 'Spain', away: 'Brazil'}
        ]}
      ],
      matches: this.props.data.matches
    }
    this.openMatch = this.openMatch.bind(this)
  }
  getMenu(){
    return this.state.menuItems.map((i)=>{
      return{
        name: i.name,
        sel: i.name===this.state.mSel,
        onClick: ()=>{this.setState({mSel:i.name})}
      }
    })
  }
  openMatch(m){
    console.log(m)
    this.setState(
      {mSel: 'Matches',
      matSel: m})
  }
  renderContent(){
    return(
      <div className='content-div'>
        {this.state.mSel==='Home' &&
          <Home top={this.state.topPlayers}
            up={this.state.upcoming}
            openMatch={this.openMatch}/>}
        {this.state.mSel==='Matches' &&
          <Matches data={this.state.matches}
            sel={this.state.matSel}
            openMatch={this.openMatch}/>}
        {this.state.mSel==='Leaderboards' &&
          <Leaderboard data={this.state.topPlayers}/>}
        {this.state.mSel==='User' &&
          <User />}
      </div>
    )
  }

  render(){
    return(
      <div className='root-div'>
        <div className='main-div'>
          <Menu items={this.getMenu()}/>
          {this.renderContent()}
        </div>
        <div className='login-div'>
          <Login loggedIn={this.state.logged}
            user={this.state.user}
            login={()=>{
              this.setState({logged: true})
            }}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App data={getMatches()}/>, document.getElementById('root'));
//registerServiceWorker();
