import React, {Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd'
import {connect} from 'react-redux'

// import memoryUtils from '../../utils/memoryUtils'
import {setHeadTitle} from '../../redux/actions'
import menuList from '../../config/menuConfig'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import NotFound from '../not-found/not-found'

const { Footer, Sider, Content } = Layout
const pathComponents = {
    '/home': Home,
    '/category': Category,
    '/product': Product,
    '/role': Role,
    '/user': User,
    '/charts/bar': Bar,
    '/charts/line': Line,
    '/charts/pie': Pie                                                    
}

class Admin extends Component{

    render(){
        // const user = memoryUtils.user
        const user = this.props.user
        if(!user||!user._id){
            return <Redirect to='/login' />
        }
        //according user->role->menus set route, make sure cannot get pages of unthorization through url
        const userPaths = user.role.menus.filter(key=>key!=='/charts'&&key!=='/products')
        const adminPaths = ['/home','/category','/product','/role','/user','/charts/bar','/charts/line','charts/pie']
        const paths = user.username==='admin'?adminPaths:userPaths
        //set headTitle
        let path = this.props.location.pathname
        let vpath = paths.find(item=>path.indexOf(item)===0)
        if(!!vpath){
            menuList.forEach(item=>{
                if(!item.children){
                    if(item.key===vpath){
                        this.props.setHeadTitle(item.title)
                    }
                }else{
                    item.children.forEach(cItem=>{
                        if(cItem.key===vpath){
                            this.props.setHeadTitle(cItem.title)
                        }
                    })
                }
            })
        }
       
        // this.props.setHeadTitle(this.props.history.location.pathname)
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content style={{margin:20, backgroundColor:'#fff'}}>
                        <Switch>
                            <Redirect from='/' to='/home' exact />
                            {
                                paths.map(path=>(
                                    <Route key={path} path={path} component={pathComponents[path]} />
                                )) 
                            }
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#bbb'}}>Using Google Chrome is recommended for enjoying better page operation experience.</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {setHeadTitle}
)(Admin)