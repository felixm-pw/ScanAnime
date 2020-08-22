// Defaults
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// AntD
import { Spin, Input, Card  } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
// Virtualised List
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import 'react-virtualized/styles.css'
// Customs
import ColorPack from '../packs/colors.js'
import Navbar from './navbar.jsx'

class Search extends React.Component {
    constructor(){
        super()
        this.handleSearch = this.handleSearch.bind(this)
        this.rowRenderer = this.rowRenderer.bind(this)
        this.loading = this.loading.bind(this)

        this.state = {
            local: [],
            loading: true,
            search: "",
            list: [],
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
                local: response.data,
                list: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
        setTimeout(() => {
            console.log(this.state.list[0])
        }, 1000);
    }

    handleSearch(searchString){
        var x = []
        this.state.local.filter(localObject => localObject.title.toLowerCase().includes(searchString.toLowerCase())).map(filteredObjects => (
            x.push(filteredObjects)
        ))
        setTimeout(() => {
            this.setState({
                list: x
            })
        }, 100);
    }

    render(){
        const { Search } = Input;
        const searchContainer = {
            textAlign: 'center',
            marginBottom: 10
        }
        const searchbar = {
        
        }
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
        return(
            <div style={{ height: '100vh', backgroundColor: '#1f1f1f' }}>
                <div>
                    <Navbar />
                </div>
                <div style={container}>
                    <Card bodyStyle={{padding: '0'}} style={card}>
                        <div style={searchContainer}>
                            <Search className={'input'} placeholder={"Search..."} onSearch={value => this.handleSearch(value)}/>
                        </div>
                        {this.loading()}
                    </Card>  
                </div>               
            </div>
        );
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
                <Link style={link} to={{pathname: "/player", state: {seasonID: this.state.list[index].id, episodeName: "Episode 1"}}}>{this.state.list[index].title}</Link>
            </div>
        );
    }
    
    loading(){
        if(this.state.list.length === 0){
            const spin = {
                marginTop: 20,
                marginBottom: 40,
                textAlign: 'center'
            }
            const antIcon = <LoadingOutlined style={{ fontSize: 32, color: '#ababab' }} spin />
            return(
                <div style={spin}>
                    <Spin indicator={antIcon} />
                </div>
            )
        }else{
            return(
                <div style={{width: '100%', height: 600}}>
                    <AutoSizer>
                        {({width, height}) => (
                            <List                        
                                width={width}
                                height={height}
                                rowCount={this.state.list.length}
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
export default Search