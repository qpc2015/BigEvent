const { result } = require('@hapi/joi/lib/base')
const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.getUserInfo = (req,res) => {

    const sql = `select id,username,nickname,email,user_pic from ev_users where id=?`
    console.log(req.user)

    db.query(sql,req.user.id,(err, results) => {
        if (err) return res.cc(err)
        if(results.length !== 1) return res.cc('获取用户信息失败！')
        return res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results[0],
        })
    })
}

exports.updateUserInfo = (req,res) => {
    const sql = `update ev_users set ? where id=?`
    db.query(sql,[{...req.body,id:req.user.id},req.user.id], (err,results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
        return res.cc('修改用户基本信息成功！', 0)
    })
}


exports.updatePassword = (req,res) => {
    const sql = `select * from ev_users where id=?`
    // 执行 SQL 语句查询用户是否存在
    db.query(sql,req.user.id, (err,results) => {
        if(err) return res.cc(err)
        if(results.length !== 1) return res.cc('用户不存在！')
        const compareResult = bcrypt.compareSync(req.body.oldPwd,results[0].password)
        if(!compareResult) return res.cc('原密码错误！')
        //更新用户密码的
        const sql = `update ev_users set password=? where id=?`
        const newPwd = bcrypt.hashSync(req.body.newPwd,10)
        db.query(sql,[newPwd,req.user.id], (err,results) => {
            console.log(newPwd)
            if(err) return res.cc(err)
            if(results.affectedRows !== 1) return res.cc('更新密码失败！')
            return res.cc('更新密码成功！', 0)
        })
    })
}

exports.updateAvatar = (req,res) => {
    const sql = `update ev_users set user_pic=? where id=?`
    db.query(sql,[req.body.avatar,req.user.id], (err,results) => {
        if(err) return res.cc(err)
        if(results.affectedRows !== 1) return res.cc('更新头像失败！')
        return res.cc('更新头像成功！',0)
    })
}