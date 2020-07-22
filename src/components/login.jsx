import React from 'react'
import { Input, Card, Button, Typography, Icon } from 'antd';

import 'antd/dist/antd.css';

class Login extends React.Component{
    constructor(){
        super()

        this.state = {

        }
    }

    render(){
        const container = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
        const card = {
            maxWidth: 400,
            marginLeft:20,
            marginRight: 20,
            textAlign: 'left'
        }
        const title = {
            marginBottom: 10
        }
        const inputBox = {
            marginBottom: 10
        }
        return(
            <div style={container}>
                <Card style={card}>
                    <Typography style={title}>scananime.ru</Typography>
                    <Input style={inputBox} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="user" />
                    <Input.Password style={inputBox} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="password" />
                    <Button>Login</Button>
                </Card>
            </div>
        );
    }
}
export default Login