const express = require('express')
const app = express()

//配置 cors 跨域
const cors = require('cors')
app.use(cors())
//配置解析 `application/x-www-form-urlencoded` 格式的表单数据的中间件
app.use(express.urlencoded({extended: false}))

// 一定要在路由之前，封装 res.cc 函数
app.use(function(req,res,next){
    res.cc = function(err,status = 1){
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }
    next()
})

//解析 token 的中间件
const config = require('./config')
const expressJWT = require('express-jwt')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256']}).unless( { path: [/^\/api\//] }))


const userRouter = require('./router/user')
app.use('/api',userRouter)

const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)

const artCateRouter = require('./router/artcate')
app.use('/my/article',artCateRouter)

const articleRouter = require('./router/article')
app.use('/my/article',articleRouter)

const joi = require('joi')
const req = require('express/lib/request')
const router = require('./router/user')
// 错误中间件
app.use(function(err,req,res,next){
    console.log(err)
    // 数据验证失败
    if(err instanceof joi.ValidationError) return res.cc(err)
    // 捕获身份认证失败的错误
    if(err.name === 'UnauthorizedError') return res.cc(err.code)
    // 未知错误
    return res.cc(err)
})

app.use('/uploads',express.static('./uploads'))

app.listen(8080,function(){
    console.log('api server running at http://127.0.0.1:8080')
})