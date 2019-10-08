const express = require('express');
const common = require('../../libs/common.js');
const mysql = require('mysql');
const pathLib = require('path');
const fs = require('fs');

var db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '66812652j',
	database: 'learn'
})

module.exports = function(){
	var router = express.Router();

	router.get('', function(req, res){
		db.query(`SELECT * FROM custom_evaluation_table`, (err, evaluations)=>{
			if(err){
				console.log(err);
				req.status(500).send('database error').end();
			}else{
				res.render('admin/custom.ejs', {evaluations});
			}
		});
	});

	router.post('', function(req, res){
		var title = req.body.title;
		var description = req.body.description;

		//处理上传文件扩展名
		var ext = pathLib.parse(req.files[0].originalname).ext;	//获取上传文件的原始名字的扩展名
		var oldPath = req.files[0].path;	//获取上传的文件在服务器上的路径
		var newPath = oldPath + ext;	//获取上传的文件在服务器上的新路径（重命名用）
		var newFileName = req.files[0].filename + ext;	//获取上传文件在服务器上的加上扩展名后的文件名
		fs.rename(oldPath, newPath, (err)=>{
			if(err){
				console.log(err);
				res.status.send('file opration error').end();
			}else{
				console.log('upload success');
			}
		})

		if(req.body.mod_id){
			//是修改操作
			

		}else{
			//是添加操作
			db.query(`INSERT INTO custom_evaluation_table (title, description, src) VALUES ('${title}', '${description}', '${newFileName}')`, (err, data)=>{
				if(err){
					console.log(err);
					res.status(500).send('database error').end();
				}else{
					res.redirect('/admin/custom');
				}
			})
		}
	});

	return router;
}