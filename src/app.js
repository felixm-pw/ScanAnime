// Defaults
import React from 'react'
import { Route, Switch } from 'react-router-dom'
// Customs
import Home from './components/home.jsx'
import VideoPlayer from './components/video-player.jsx'
import Search from './components/search.jsx'
import Login from './components/login.jsx'
import Releases from './components/releases.jsx'

class App extends React.Component {
  render() {
    return (
      <div style={{backgroundColor: '#131415', height: '100vh', paddingLeft: 1, paddingRight: 1}}>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/search" exact component={Search}/>
          <Route path="/player" exact component={VideoPlayer}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/releases" exact component={Releases}/>
        </Switch>
      </div>
    );
  }
}
export default App
