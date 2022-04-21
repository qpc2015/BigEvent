# BigEvent
黑马大事件学习项目

该项目代码整合了前端和后端

后端代码没有提交node_modules文件夹，若要使用请先npm init

后端关于mysql连接的配置在 /db/index.js中，默认连接数据库名称api_server, 数据库用户root,数据库密码替换为自己的创建密码
 后端关于jwt字符串有效期配置在 /config.js中，默认10h有效期 后端服务器启动在本地8080端口上 

后端接口文档：https://www.showdoc.com.cn/escook?page_id=3707158761215217 开发存在部分不一致

数据库是mysql，只有三张表，ev_users、ev_articles、ev_article_cate
