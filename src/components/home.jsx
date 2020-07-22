// Defaults
import React from 'react'
import axios from 'axios'
import CountUp from 'react-countup'
// Antd
import { Typography,  Row, Col, Card, Timeline } from 'antd'
// Customs
import ColorPack from '../packs/colors.js'
import Navbar from './navbar'

class Home extends React.Component{
    constructor(){
        super()

        this.state = {
            animeCount: 0
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: 'http://192.168.1.188:9696/api/new_list',
            responseType: 'json',
        })
        .then((response) => {
            this.setState({
                animeCount: response.data.length
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render(){
        const { Text } = Typography
        const container = {
            justifyContent: 'center',
            textAlign: 'center',
            display: 'flex'
        }
        const card = {
            marginTop: 10,
            padding: 10,
            width: '100%',
            backgroundColor: ColorPack.cardColor,
            borderColor: ColorPack.cardBorderColor,
            textAlign: 'left'
        }
        const title = {
            fontSize: 20,
            color: ColorPack.textColor
        }
        const text = {
            color: ColorPack.textColor
        }
        const timeline = {
            marginTop: 10,
            color: ColorPack.textColor,
            BorderVerticleOutlined: 'red'
        }
        return(
            <div>
                <div>
                    <Navbar />
                </div>
                <div style={container}>
                    <Card bodyStyle={{padding: '0'}} style={card}>
                        <div>
                            <img style={{float: 'right'}} src={"logo.png"} alt="Logo" height="60" />
                        </div>
                        <div>
                           <Text style={title}>Welcome to ScanAnime!</Text> 
                        </div>
                        <Text style={text}>The database currently has {<CountUp start={0} end={this.state.animeCount} duration={2}></CountUp>} anime.</Text>
                    </Card>                   
                </div>
                <div style={container}>
                    <Card bodyStyle={{padding: '0'}} style={card}>
                    <Text style={title}>Update Log</Text>
                    <Timeline style={timeline}>
                        <Timeline.Item color="green">[01/03/2020] ScanAnime started</Timeline.Item>
                        <Timeline.Item color="green">[10/03/2020] Routing & UI built</Timeline.Item>
                        <Timeline.Item color="green">[14/03/2020] Virtualized list and search implemented</Timeline.Item>
                        <Timeline.Item color="green">[20/03/2020] "New Releases" feature added</Timeline.Item>
                        <Timeline.Item color="green">[03/04/2020] Custom cache system built</Timeline.Item>
                        <Timeline.Item color="blue">[In Progress] User login database</Timeline.Item>
                        <Timeline.Item color="blue">[In Progress] Filter by genre</Timeline.Item>
                        <Timeline.Item color="gray">[Coming Soon] MAL integration</Timeline.Item>
                        <Timeline.Item color="gray">[Coming Soon] Per user episode tracking</Timeline.Item>
                    </Timeline>
                    </Card>                   
                </div>
            </div>
        )
    }
}

export default Home