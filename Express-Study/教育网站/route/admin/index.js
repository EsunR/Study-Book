const express = require('express');

module.exports = function(){
	var router = express.Router();

	//检查登录状态，如果为未登录，访问/login进行登录操作
	router.use((req, res, next)=>{
		if(!req.session['admin_id'] && req.url!='/login'){	//没有登录
			res.redirect('/admin/login');
		}
		else{
			next();
		}
	})

	//访问/login页
	router.use('/login', require('./login.js')());

	//登录成功访问'localhost:8080/admin页面'
	router.get('/', (req, res)=>{
		res.render('admin/index.ejs');
	});


	//访问localhost:8080/admin/banner页
	router.use('/banners', require('./banners.js')());

	//访问localhost:8080/admin/custom页
	router.use('/custom', require('./custom.js')());


	return router;
}