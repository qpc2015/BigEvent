const path = require('path')
const db = require('../db/index')


exports.addArticle = (req, res) => {
    console.log(req.body)
    console.log('-----------------')
    console.log(req.file)
    
    const articleInfo = {
        ...req.body,
        cover_img: path.join('/uploads',req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }

    const sql = `insert into ev_articles set ?`
    db.query(sql,articleInfo,(err,results) => {
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('发布文章失败！')
        res.cc('发布文章成功',0)
    })
}