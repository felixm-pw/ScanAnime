// Defaults
import React from 'react'
import axios from 'axios'
import CountUp from 'react-countup'
// Antd
import { Typography, Card } from 'antd'
// Customs
import Navbar from './navbar'
import ColorPack from '../packs/colors.js'
import '../styles/home-styles.css'

class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            animeCount: 0,
            hot: []
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: 'http://10.108.71.97:9696/api/new_list',
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

        axios({
            method: 'get',
            url: 'http://10.108.71.97:9696/api/hot_content',
            responseType: 'json',
        })
        .then((response) => {
            this.setState({
                hot: response.data
            })
            console.log(this.state.hot)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render(){
        const card = {
            marginTop: 10,
            padding: 10,
            width: '100%',
            backgroundColor: ColorPack.cardColor,
            borderColor: ColorPack.cardBorderColor,
            textAlign: 'left'
        }
        const text = {
            color: ColorPack.textColor
        }
        return(
            <div>
                <div>
                    <Navbar />
                </div>
                <div className="container">
                    <Card bodyStyle={{padding: '0'}} className="card">
                        <div>
                            <img style={{float: 'right'}} src={"logo.png"} alt="Logo" height="60" />
                        </div>
                        <div>
                           <h1 className="title">Welcome to ScanAnime!</h1> 
                        </div>
                        <h1 className="text">The database currently has {<CountUp start={0} end={this.state.animeCount} duration={2}></CountUp>} anime.</h1>
                    </Card>                   
                </div>

                <div className="container">
                    <Card bodyStyle={{padding: '0'}} className="card">
                        <div>
                           <h1 className="title">News</h1> 
                        </div>
                        <h1 className="text">Rest in peace Kissanime, you will be missed greatly. Thanks for the 7 years 💔 much love from Scananime!</h1>
                    </Card>                   
                </div>
            </div>
        )
    }
}

export default Home