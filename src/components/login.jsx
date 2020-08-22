import React from 'react'
import { Input, Card, Button, Icon } from 'antd';
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
            height: '100vh'
        }
        const card = {
            maxWidth: 300,
            marginLeft: 20,
            marginRight: 20,
            textAlign: 'left'
        }
        const inputBox = {
            marginBottom: 10,
            width: '100%'
        }
        return(
            <div style={container}>
                <Card style={card}>
                    <div style={{textAlign: 'center', marginBottom: 20}}>
                        <img src={"logo.png"} alt="Logo" height="150" />
                    </div>
                    <Input style={inputBox} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    <Input.Password style={inputBox} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
                    <Button style={{width: '100%'}}>Login</Button>
                </Card>
            </div>
        );
    }
}
export default Login