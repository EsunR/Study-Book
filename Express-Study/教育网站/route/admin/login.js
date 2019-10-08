const express = require('express');
const common = require('../../libs/common.js');
const mysql = require('mysql');

var db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '66812652j',
	database: 'learn'
})

module.exports = function(){
	var router = express.Router();
	//访问页面是分类型来处理发送的数据
	///如果访问/login时没有post数据就渲染页面
	router.get('/', (req, res)=>{
		res.render('admin/login.ejs', {})
	})
	///如果访问/login是有post数据（用户点击“登录”按钮时）就进行登录操作
	router.post('/', (req, res)=>{
		var username = req.body.username;
		var password = common.md5(req.body.password + common.MD5_SUFFIX);

		//数据库操作
		db.query(`SELECT * FROM admin_table WHERE username='${username}'`, (err, data)=>{
			if(err){
				console.log(err);
				res.status(500).send('database error').end();
			}else{
				if(data.length == 0){
					res.status(400).send('no this admin').end();
				}else{
					if(data[0].password == password){
						//对比密码成功后设置登录id
						req.session['admin_id'] = data[0].ID;
						res.redirect('/admin');
					}else{
						res.status(500).send('password error').end();
					}
				}
			}
		})
	})

	return router;
}