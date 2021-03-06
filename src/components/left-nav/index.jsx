import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux'

import logo from '../../assets/images/logo.png'
import './index.less'
import menuList from '../../config/menuConfig'
// import memoryUtils from '../../utils/memoryUtils'
import {setHeadTitle} from '../../redux/actions'

const { SubMenu } = Menu

class LeftNav extends Component{

    // getMenuNodes_map = (menuList)=>{
    //     return menuList.map(item=>{
    //         if(!item.children){
    //             return (
    //                 <Menu.Item key={item.key}>
    //                     <Link to={item.key}>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </Link>
    //                 </Menu.Item>
    //             )
    //         } else {
    //             return (
    //                 <SubMenu
    //                     key={item.key}
    //                     title={
    //                     <span>
    //                         <Icon type={item.icon} />
    //                         <span>{item.title}</span>
    //                     </span>
    //                     }
    //                 >
    //                     {
    //                         this.getMenuNodes(item.children)
    //                     }
    //                 </SubMenu>
    //             )
    //         }  
    //     })
        
    // }
    hasAuth = (item) => {
        const {key,isPublic} = item
        const menus = this.props.user.role.menus
        const username = this.props.user.username
        // const menus = memoryUtils.user.role.menus
        // const username = memoryUtils.user.username
        // if current user is admin
        //or any page is public that can be accessed by any user
        //current user has authorization to access certain page
        if(username==='admin' || isPublic || menus.indexOf(key)!==-1){
            return true
        }else if(item.children){//item's children may have page permitted
            return !!item.children.find(child=>menus.indexOf(child.key)!==-1)
        }
        return false
    }

    getMenuNodes = (menuList)=>{
        const path = this.props.location.pathname
        return menuList.reduce((pre,item)=>{
            if(this.hasAuth(item)){
                if(!item.children){
                    //fix title return to default after fresh explorer
                    // if(item.key===path || path.indexOf(item.key)===0){
                    //     this.props.setHeadTitle(item.title)
                    // }
                // onClick={()=>this.props.setHeadTitle(item.title)}  before in the Link open tag
                    pre.push((
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                }else{
                    const cItem = item.children.find(cItem=>path.indexOf(cItem.key)===0)
                    if(cItem){
                        this.openKey = item.key
                    }
                    pre.push((
                        <SubMenu
                            key={item.key}
                            title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                            }
                        >
                            {
                                this.getMenuNodes(item.children)
                            }
                        </SubMenu>
                    ))
                }
            }
            return pre
        },[])
    }

    UNSAFE_componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render(){
        let path = this.props.location.pathname
        if(path.indexOf('/product')===0){path='/product'}
        const openKey = this.openKey
        return (
            <div className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt='logo' />
                    <h1>Bg Admin</h1>
                </Link>
                <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}
                >
                {
                    this.menuNodes
                }                  
                </Menu>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {setHeadTitle}
)(withRouter(LeftNav))