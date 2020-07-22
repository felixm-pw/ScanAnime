// Default
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// Antd
import { Typography,  Row, Col, Card, Button } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
// Virtualised List
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import 'react-virtualized/styles.css';
// Custom
import ColorPack from '../packs/colors.js'
import Navbar from './navbar'

class Home extends React.Component{
    constructor(){
        super()
        this.rowRenderer = this.rowRenderer.bind(this)
        this.loading = this.loading.bind(this)
        this.epcheck = this.epcheck.bind(this)
        this.state = {
            hot: [],
            new: [],
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: 'http://192.168.1.188:9696/api/new_content',
            responseType: 'json'
        })
        .then((response) => {
            this.setState({
                hot: response.data.HotContent,
                new: response.data.NewContent
            })
            setTimeout(() => {
                console.log(response.data.NewContent)
            }, 1000);
        })
        .catch((error) => {
            console.log(error)
        });
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
        const container = {
            justifyContent: 'center',
            textAlign: 'center',
            display: 'flex'
        }
        const title = {
            fontSize: 20,
            color: ColorPack.textColor
        }
        const { Text } = Typography
        return(
            <div style={{ height: '100vh', backgroundColor: '#1f1f1f' }}> 
                <div>
                    <Navbar />
                </div>
                <div style={container}>
                    <Card bodyStyle={{padding: 0}} style={card}>
                        <Text style={title}>Latest Updates</Text>
                        <div style={{width: '100%', height: 600, marginTop: 10}}>
                            <AutoSizer>
                                {({width, height}) => (
                                    <List
                                        width={width}
                                        height={height}
                                        rowCount={this.state.new.length}
                                        rowHeight={80}
                                        rowRenderer={this.rowRenderer}
                                    />
                                )}
                            </AutoSizer>  
                        </div> 
                    </Card>
                </div>
            </div>
        )
    }

    rowRenderer({key,index,style,}) {
        const { Text } = Typography
        const card = {
            backgroundColor: ColorPack.cardColor,
            borderColor: ColorPack.cardBorderColor,
        }
        const text = {
            color: '#ababab',
            fontSize: 14,
            whiteSpace: 'nowrap',
            overflow: 'elipsis'
        }
        const button = {
            width: '100%',
            height: 64,
            backgroundColor: ColorPack.cardColor,
            borderColor: ColorPack.cardBorderColor,
            color: ColorPack.textColor
        }
        return(
            <div key={key} style={style}>
                <Card style={card} bodyStyle={{padding: 2}}>
                    <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>

                        <div style={{float: "left", width: 60 }}>
                            <img style={{width: 48, height: 64}} src={'http://www.anime1.com/main/img/content/'+this.state.new[index].Seo+'/'+this.state.new[index].Image} />
                        </div>
                        
                        <div style={{width: "100%"}}>
                            <div style={text}>{this.state.new[index].Title}</div>
                            <div style={text}>{this.epcheck(index)}</div>
                        </div>
                        
                        <div style={{float:"right", width: 70}}>
                            <Link to={{pathname: "/player", state: { seasonID: this.state.new[index].Content_ID }}}>
                                <Button style={button}><PlayCircleOutlined /></Button>
                            </Link>   
                        </div>
                        
                    </div>
                </Card>                  
            </div>
        );
    }

    loading(){
            return(
                <div style={{width: '100%', height: 300, marginTop: 10}}>
                    <AutoSizer>
                        {({width, height}) => (
                            <List
                                width={width}
                                height={height}
                                rowCount={this.state.new.length}
                                rowHeight={80}
                                rowRenderer={this.rowRenderer}
                            />
                        )}
                    </AutoSizer>
                </div>
            )     
    }

    epcheck(index){
        if(this.state.new[index].Episodes.length === 0 || this.state.new[index].Episodes[0].Title === "Episode 1"){
            return("New Season!")
        }
        else{
            return(this.state.new[index].Episodes[0].Title)
        }
    }
}
export default Home