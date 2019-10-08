#! -*- coding:utf-8 -*-

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql

pymysql.install_as_MySQLdb()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/flask_study'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


# 数据库模型，需要继承db.Model
class Role(db.Model):
    #    定义表名
    __tablename__ = "roles"
    #     定义字段
    #     db.Column表示一个字段
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16), unique=True)

    # 在一的乙方，写关联（填写模型名）
    # 表示和User模型发生了关联，增加了一个users属性
    users = db.relationship('User', backref="role")

    # repr()方法显示一个可读字符串
    def __repr__(self):
        return '<Role: %s %s>' % (self.name, self.id)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16), unique=True)
    email = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(64))
    # db.ForeignKey标识外键
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))

    # User希望有role属性，但是这个属性的定义，需要另一个模型中定义
    def __repr__(self):
        return '<User: %s %s %s %s>' % (self.name, self.id, self.email, self.password)


@app.route('/')
def index():
    return 'Hello flask!'


if __name__ == '__main__':
    # 删除表
    db.drop_all()

    # 创建表
    db.create_all()

    ro1 = Role(name='admin')
    db.session.add(ro1)
    db.session.commit()
    # 再次插入一条数据
    ro2 = Role(name='user')
    db.session.add(ro2)
    db.session.commit()

    us1 = User(name='wang', email='wang@163.com', password='123456', role_id=ro1.id)
    us2 = User(name='zhang', email='zhang@189.com', password='201512', role_id=ro2.id)
    us3 = User(name='chen', email='chen@126.com', password='987654', role_id=ro2.id)
    us4 = User(name='zhou', email='zhou@163.com', password='456789', role_id=ro1.id)
    us5 = User(name='tang', email='tang@itheima.com', password='158104', role_id=ro2.id)
    us6 = User(name='wu', email='wu@gmail.com', password='5623514', role_id=ro2.id)
    us7 = User(name='qian', email='qian@gmail.com', password='1543567', role_id=ro1.id)
    us8 = User(name='liu', email='liu@itheima.com', password='867322', role_id=ro1.id)
    us9 = User(name='li', email='li@163.com', password='4526342', role_id=ro2.id)
    us10 = User(name='sun', email='sun@163.com', password='235523', role_id=ro2.id)
    db.session.add_all([us1, us2, us3, us4, us5, us6, us7, us8, us9, us10])
    db.session.commit()

    app.run(debug=True)

