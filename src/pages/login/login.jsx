import React, {Component} from 'react'
import { Form, Icon, Input, Button } from 'antd'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import './login.less'
import logo from '../../assets/images/logo.png'
import {login} from '../../redux/actions'
// import {reqLogin} from '../../api'
// import memoryUtils from '../../utils/memoryUtils'
// import storageUtils from '../../utils/storageUtils'

class Login extends Component{
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
            //   console.log('Received values of form: ', values);
                const {username, password} = values
                this.props.login(username,password)
                // const result = await reqLogin(username,password)
                // if(result.status===0){
                //     message.success('Login successfully.')
                //     const user = result.data
                //     memoryUtils.user = user
                //     storageUtils.saveUser(user)
                //     this.props.history.replace('/home')
                // }else{
                //     message.error(result.msg)
                // }
                // reqLogin(username,password).then(response=>{
                //     console.log('success',response.data)
                // }).catch(error=>{
                //     console.log('failed',error)
                // })
            }else{
                console.log('login form validation failed.')
            }
        })
    }
    pswValidator = (rule,value,callback) => {
        if(!value){
            callback('Please input your password!')
        }else if(value.length<5){
            callback("At least 5 characters!")
        }else if(value.length>12){
            callback("Maximum 12 characters!")
        }else{
            callback()
        }
        // else if(!/^[a-zA-Z0-9_]+$/.test(value)){
        //     callback('Only can contain character number or underline!')
        // }
    }
    render(){
        // const user = memoryUtils.user
        const user = this.props.user
        if(user && user._id){
            return <Redirect to='/home' />
        }
        const { getFieldDecorator } = this.props.form
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo' />
                    <h1>React: back-end admin system</h1>
                </header>
                <section className='login-content'>
                    <h2>User Login</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, whitespace: true, message: 'Please input your username!' },
                                    { min: 4, message: 'At least 4 characters!' },
                                    { max: 12, message: 'Maximum 12 characters!' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: 'Only can contain character number or underline!' },

                                ],
                                initialValue:'admin'
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password',{
                                rules: [
                                    {validator:this.pswValidator}
                                ],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                />
                            )}                          
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {login}
)(Form.create()(Login))