 // Default
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// AntD
import { Card, Typography,  Row, Col, Button } from 'antd'
// Virtualised List
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import 'react-virtualized/styles.css'
//Custom
import ColorPack from '../packs/colors.js'
import Navbar from './navbar'

class Season extends React.Component{
    constructor(){
        super()
        this.rowRenderer = this.rowRenderer.bind(this)
        this.loading = this.loading.bind(this)

        this.state = {
            local: {}
        }
    }

    componentDidMount() {
        axios({
          method: 'post',
          url: 'http://10.108.71.97:9696/api/get_season',
          responseType: 'json',
          data:{ test: this.props.location.state.seasonID } 
        })
        .then((response) => {
          this.setState({
            local: response.data,
          })
        })
        .catch((error) => {
          console.log(error)
        })
        setTimeout(() => {
            console.log(this.state.local)
        }, 1000);
    }

    render(){
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
        const button = {
            width: 100,
            height: 28
        }
        const title = {
            fontSize: 20,
            fontWeight: 1,
            color: '#ababab',
        }
        const picture = {
            width: 112,
            height: 159,
            marginTop: 10
        }
        const buttonBar = {
            marginTop: 10
        }
        const { Text } = Typography
        var coverArt = 'http://www.anime1.com/main/img/content/'+ this.state.local.Seo+'/'+ this.state.local.Image
        return(
            <div>
                <div>
                    <Navbar />
                </div>  
                <div style={container}>
                    <Card bodyStyle={{ padding: 0}} style={card}>
                        <Row>
                            <Col xs={24} md={24} lg={24}>
                                <Text style={title}>{this.state.local.Title}</Text>
                            </Col>
                            <Col xs={24} md={24} lg={24}>
                                <div style={{textAlign: 'center',}}>
                                    <img style={picture} alt="img" src={coverArt} />
                                </div>
                            </Col>
                            <Col xs={24} md={24} lg={24}>
                                <div style={buttonBar}>
                                    <Button style={button}>MAL</Button>
                                    <Button style={button}>Info</Button>
                                    <Button style={{float: 'right'}}>Watching</Button>
                                </div>
                            </Col>
                            <Col xs={24} md={24} lg={24}>
                                {this.loading()}
                            </Col>
                        </Row>
                    </Card>
                </div>
            </div>
        )
    }

    rowRenderer({key,index,style,}) {
        const link = {
            color: '#ababab',
            fontSize: 16,
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        }
        return(
            <div key={key} style={style}>
                <Link style={link} to={{pathname: "/player", state: {seasonID: this.state.local.Content_ID}}}>{this.state.local.Episodes[index].Title}</Link>
            </div>
        );
    }

    loading(){
        if(this.state.local.Episodes === undefined){
            return(
                <div>
                    
                </div>
            )
        } 
        else {
            return(
                <div style={{width: '100%', height: 300, marginTop: 10}}>
                    <AutoSizer>
                        {({width, height}) => (
                            <List
                                width={width}
                                height={300}
                                rowCount={this.state.local.Episodes.length}
                                rowHeight={20}
                                rowRenderer={this.rowRenderer}
                            />
                        )}
                    </AutoSizer>
                </div>
            )
        }
    }
}
export default Season
