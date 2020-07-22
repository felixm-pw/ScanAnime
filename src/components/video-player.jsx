// Default
import React from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
// AntD
import { Card, Select, Typography, Button,  Row, Col } from 'antd'
// Custom
import ColorPack from '../packs/colors.js'
import Navbar from './navbar.jsx'

class App extends React.Component {
  constructor() {
    super()
    this.menuItems = this.menuItems.bind(this)
    this.getEpisode = this.getEpisode.bind(this)

    this.state = {
      anime: [],
      eps: [],
      url: '',
    }
  }

  componentDidMount() {
    axios({
      method: 'post',
      url: 'http://192.168.1.188:9696/api/get_season',
      responseType: 'json',
      data:{ test: this.props.location.state.seasonID } 
    })
    .then((response) => {
      this.setState({
        anime: response.data,
        eps: response.data.Episodes,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  menuItems() {
    const { Option } = Select
    return this.state.eps.map((eps) => (
      <Option key={eps.Episode_ID} value={eps.Episode_ID} name={eps.Title}>{eps.Title}</Option>
    ));
  }

  render() {
    const { Text } = Typography
    const container = {
      justifyContent: 'center',
      textAlign: 'center',
      display: 'flex'
    }
    const card = {
      marginTop: 10,
      padding: 10,
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
      backgroundColor: ColorPack.cardColor,
      borderColor: ColorPack.cardBorderColor
    }
    const title = {
      fontSize: 20,
      fontWeight: 1,
      color: '#ababab'
    }
    const playerOuterContainer = {
      marginTop: 20,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    }
    const playerInnerContainer = {
      maxWidth: 960,
      maxHeight: 540,
      marginBottom: 10
    }
    const episodeSelect = {
      width: '100%',
      textAlign: 'left',
      color: ColorPack.textColor,
      backgroundColor: ColorPack.cardColor,
      borderColor: ColorPack.cardBorderColor,
    }
    const malButton = {
      width: '100%',
      color: ColorPack.textColor,
      backgroundColor: ColorPack.cardColor,
      borderColor: ColorPack.cardBorderColor,
    }
    return (
      <div>
        <div style={{width: '100%'}}>
          <Navbar />
        </div>
        <div style={container}>
          <Card bodyStyle={{padding: '0'}} style={card}>
            <Text style={title}>{this.state.anime.Title}</Text>
            <div style={playerOuterContainer}>
              <div style={playerInnerContainer}>
                <ReactPlayer width={'100%'} height={'100%'} url={this.state.url} controls={true} pip={true} />
              </div>
            </div>
              <div>
                <Row gutter={10}>
                  <Col xs={19} md={19} lg={19}>
                    <Select style={episodeSelect} defaultValue="Select Episode" onChange={(value) => this.getEpisode(value)} >{this.menuItems()}</Select>
                  </Col>
                  <Col xs={5} md={5} lg={5}>
                    <Button style={malButton} href={"https://myanimelist.net/search/all?q="+this.state.anime.Title} target="_blank">MAL</Button>
                  </Col>
                </Row>
              </div>
          </Card>
        </div>
      </div>
    );
  }

  getEpisode(value) {
    var data = { id: value }
    axios({
      method: 'post',
      url: 'http://192.168.1.188:9696/api/get_episode',
      responseType: 'json',
      data: data
    })
    .then((response) => {
      this.setState({
        url: 'http://st2.anime1.com' + response.data[0].link,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

export default App