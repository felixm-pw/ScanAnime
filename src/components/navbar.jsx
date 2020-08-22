// Defualts
import React from 'react'
import { Link } from 'react-router-dom'
// antD
import { Card, Icon, Drawer, Typography, Button } from 'antd'
import { HomeOutlined, StarOutlined, SearchOutlined, CarryOutOutlined } from '@ant-design/icons'
// Custom
import ColorPack from '../packs/colors.js'

class Navbar extends React.Component {
    constructor(){
        super()
        this.toggle = this.toggle.bind(this)
        
        this.state = {
            open: false,
            username: 'Felix'
        }
    }

    toggle(){
        this.setState({
          open: !this.state.open
        })
    }

    render(){
        const { Text } = Typography;
        const card = {
            width: '100%',
            backgroundColor: ColorPack.cardColor,
            borderColor: ColorPack.cardBorderColor
        }
        const drawerTitle = {
            marginLeft: 18,
            color: ColorPack.textColor
        }
        const buttons = {
            backgroundColor: ColorPack.cardColor,
            borderColor: ColorPack.cardBorderColor,
            color: ColorPack.textColor,
            marginBottom: 10,
            textAlign: 'left',
            width: '100%',
            height: 40
        }
        const username = {
            color: ColorPack.textColor
        }
        return(
            <div>
                <Card size="small" style={card}>
                    <Icon style={{color: '#ababab'}} type="menu" onClick={() => this.toggle()} />
                    <Text style={drawerTitle}>ScanAnime</Text>
                </Card>

                <Drawer 
                    drawerStyle={{backgroundColor: ColorPack.cardColor}} 
                    headerStyle={{backgroundColor: ColorPack.cardColor}} 
                    title={
                        <div>
                            <Text style={username}>{this.state.username}</Text>
                            <Card style={{float: 'right', width: 70, textAlign: 'center', background: 'linear-gradient(to bottom right, red, yellow)', borderColor: ColorPack.cardBorderColor}} bodyStyle={{padding: '0'}}>
                                <Text style={{color: 'white'}}>developer</Text>
                            </Card>
                        </div>
                    } 
                    footer={
                        <Button>test</Button>
                    }
                    placement="left" 
                    closable={false} 
                    onClose={() => this.toggle()} 
                    visible={this.state.open}>

                    <Link to="/home">
                        <Button style={buttons}><HomeOutlined/>Home</Button>
                    </Link>
                    <Link to="/releases">
                        <Button style={buttons}><CarryOutOutlined/>New Releases</Button>
                    </Link>
                    <Button style={buttons}><StarOutlined/>Watching</Button>
                    <Link to="/search">
                        <Button style={buttons}><SearchOutlined/>Search</Button>
                    </Link>
                </Drawer>
            </div>
        );
    }
}
export default Navbar