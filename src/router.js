import vueRouter from 'vue-router'
import User from './components/User'
import UserBalance from './components/UserBalance'
import Transaction from './components/Transaction'
import UserAuth from './components/UserAuth'
import App from './App'

const router = new vueRouter({
        mode: 'history',
        base: __dirname,
        routes: [
            {
                path: '/',
                name: "root",
                component: App
            },
            {
                path: '/user/:username',
                name: "user",
                component: User
            },
            {
                path: '/user/balance/:username',
                name: "user_balance",
                component: UserBalance
            },
            {
                path: '/user/transaction',
                name: "transaction",
                component: Transaction
            },
            {
                path: '/user/auth',
                name: "user_auth",
                component: UserAuth
            }
        ]
    })
export default router