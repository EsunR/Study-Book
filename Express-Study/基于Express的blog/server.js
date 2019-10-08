const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const consolidate = require('consolidate');
const mysql = require('mysql');
const common = require('./libs/common.js');


//创建数据库连接池
const db = mysql.createPool({
		host: 'localhost', 
		user: 'root',
		password: '66812652j',
		database: 'blog'
})

//开启服务器
var server = express();
server.listen(8080)


//1.解析cookie
server.use(cookieParser('sadasdasdfggc3sdfgvzxz'));	//设置签名


//2.使用session
var arr = [];
for(var i=0; i<100000; i++){
arr.push('keys_' + Math.random());
}
server.use(cookieSession({name: 'zns_sess_id', keys: arr, maxAge: 20*3600*1000})); //20分钟


//3.处理post数据，请求时调用req.body
server.use(bodyParser.urlencoded({extended: false}));	//关闭拓展模式


//4.配置模板引擎
///输出什么东西
server.set('view engine', 'html');	//set用来配置全局的server
///模板文件放在template文件夹下
server.set('views', './template');
///那种模板引擎
server.engine('html', consolidate.ejs);


//6.接收用户请求
///获取banner
server.get('/',  (req, res, next)=>{
	//查询banner
	db.query("SELECT * FROM banner_table", (err, data)=>{
		if(err){
			console.log(err);
			res.status(500).send('database error').end();
		}else{
			res.banners = data;
			//执行链式操作
			next();
		}
	});
})
///获取article
server.get('/', (req, res, next)=>{
	//查询article列表
	db.query('SELECT ID, title, summery FROM article_table', (err, data)=>{
		if(err){
			res.status(500).send('datbase error').end();
		}else{
			res.article = data;
			next();
		}
	});
})
///渲染首页
server.get('/', (req, res)=>{
	res.render('index.ejs', {banners: res.banners, article: res.article});
});
///渲染文章页
server.get('/article', (req, res, next)=>{
	//解析GET数据，如果解析失败，则说明url不合法
	if(req.query.id){
		if(req.query.act=='like'){
			console.log(req.query);
			//判断用户是否进行了点赞操作
			db.query(`UPDATE article_table SET n_like=n_like+1 WHERE ID=${req.query.id}`, (err, data)=>{
				if(err){
					res.send('数据库写入出错！').end();
				}
				else{
					//显示文章
					db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, (err, data)=>{
						if(err){
							res.status(500).send('数据有问题').end();
							console.log(err);
						}
						else{
							//判断请求的文章id是否存在，即判断SQL语句中WHERE搜出的数据是否为NULL
							if(data.length == 0){
								res.status(404).send('文章不存在').end();
							}
							else{
								var articleData = data[0];
								articleData.sDate = common.time2date(articleData.post_time);
								articleData.content = articleData.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
								res.render('conText.ejs', {
									article_data: articleData
								})
							}
						}
					})
				}
			})
		}
		else{
			//显示文章
			db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, (err, data)=>{
				if(err){
					res.status(500).send('数据有问题').end();
					console.log(err);
				}else{
					//判断请求的文章id是否存在，即判断SQL语句中WHERE搜出的数据是否为NULL
					if(data.length == 0){
						res.status(404).send('文章不存在').end();
					}
					else{
						var articleData = data[0];
						articleData.sDate = common.time2date(articleData.post_time);
						articleData.content = articleData.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');

						console.log(articleData.n_like);

						res.render('conText.ejs', {
							article_data: articleData
						})
					}
				}
			})
		}	
	}
	else{
			res.status(404).send('url不合法').end();
	}
	//res.render('conText.ejs', {})
});

//5.配置static，设置读取静态文件的目录
server.use(static('./www'));