#! -*- coding:utf-8 -*-
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import pymysql

pymysql.install_as_MySQLdb()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/flask_study'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 创建数据库对象
db = SQLAlchemy(app)

'''
1. 配置数据库
    a. 导入SQLAlchemy扩展
    b. 创建db对象，配置参数
    c. 终端创建数据库
2. 添加书和作者的模型
3. 添加初始数据
4. 是用模板显示数据
5. 使用WTF显示表单
6. 实现相关的增删逻辑
'''


# 定义书和作者模型
# 　作者模型
class Author(db.Model):
    __tablename__ = 'authors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16), unique=True)

    # 关系引用：author是自己用的，author是Book模型用的
    books = db.relationship('Book', backref='author')

    def __repr__(self):
        return "Author: %s" % self.name


@app.route('/')
def index():
    return render_template('books.html')


if __name__ == "__main__":
    app.run(debug=True)
