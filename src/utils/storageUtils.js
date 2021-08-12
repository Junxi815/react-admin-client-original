import store from 'store'

//进行local数据存储管理的工具模块
//原生localStorage，低版浏览器可能不支持
const USER_KEY = 'user_key'
const PRODUCT_KEY = 'product_key'
export default {
    //save product
    saveProduct(product){
        store.set(PRODUCT_KEY,product)
    },
    //get product
    getProduct(){
        return store.get(PRODUCT_KEY) || {}
    },
    //delete product
    removeProduct(){
        // localStorage.removeItem(USER_KEY)
        store.remove(PRODUCT_KEY)
    },

    //save user
    saveUser(user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    //get user
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },
    //delete user
    removeUser(){
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}