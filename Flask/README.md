# 1. Hello Flask

快速开始示例：

```python
from flask import Flask

app = Flask(__name__)

@app.route('/', methods=["get"])
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
```

# 2. 使用数据库

## 2.1 使用flask_sqlalchemy连接和创建数据库内容

[笔记：flask数据库之Flask-SQLAlchemy安装及配置](https://blog.csdn.net/feilzhang/article/details/81041637)

```python
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


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16), unique=True)
    # db.ForeignKey标识外键
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))


@app.route('/')
def index():
    return 'Hello flask!'


if __name__ == '__main__':
    # 删除表
    db.drop_all()

    # 创建表
    db.create_all()

    app.run(debug=True)
```

## 2.2 在shell中使用ipython修改数据

[笔记：flask数据库之基本操作模型建立](https://blog.csdn.net/feilzhang/article/details/81041663)

注意：在ipython已经不支持python2，需要安装旧版本来获取对Python2的支持！

```
$ pip install ipython==5.4.0
# In [5]: user = User(name="heima", role_id=role.id)
#
# In [6]: db.session.add(user)
#
# In [7]: db.session.commit()
#
# In [8]: user.name = 'chengxuyuan'
#
# In [9]: db.session.commit()
#
# In [10]: db.session.delete(user)
#
# In [11]: db.session.commit()
```


##　2.3 创建关系引用

[笔记：flask数据库之多对多模型演练](https://blog.csdn.net/feilzhang/article/details/81041747)

```python
# ... ...

db = SQLAlchemy(app)


# 数据库模型，需要继承db.Model
class Role(db.Model):
    # ... ...

    # 在一的乙方，写关联（填写模型名）
    # 表示和User模型发生了关联，增加了一个users属性
    users = db.relationship('User', backref="role")

    # repr()方法显示一个可读字符串
    def __repr__(self):
        return '<Role: %s %s>' % (self.name, self.id)


class User(db.Model):
    # ... ...
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
    app.run(debug=True)
```

创建了关系引用后，我们可以通过访问数据对象实例的属性来访问相关联的数据，如：

```
In [3]: role = Role(name = "admin")
In [4]: db.session.add(role)
In [5]: db.session.commit()

=== 完成角色创建 === 

In [6]: user1 = User(name='zs', role_id=role.id)
In [7]: user2 = User(name='ls', role_id=role.id)
In [10]: db.session.add(user1)
In [11]: db.session.add(user2)
In [12]: db.session.commit()

=== 完成用户创建 ===

=== 进行关联查询 === 

In [13]: role.users
Out[13]: [<User: zs 1 None None>, <User: ls 2 None None>]

In [20]: user1.role
Out[20]: <Role: admin 1>

```

## 2.4 数据库数据的查询

### 常用的SQLAlchemy查询过滤器

| 过滤器 | 说明 |
| --- | --- |
| filter() | 把过滤器添加到原查询上，返回一个新查询 |
| filter\_by() | 把等值过滤器添加到原查询上，返回一个新查询 |
| limit | 使用指定的值限定原查询返回的结果 |
| offset() | 偏移原查询返回的结果，返回一个新查询 |
| order\_by() | 根据指定条件对原查询结果进行排序，返回一个新查询 |
| group\_by() | 根据指定条件对原查询结果进行分组，返回一个新查询 |

### 常用的SQLAlchemy查询执行器

| 方法 | 说明 |
| --- | --- |
| all() | 以列表形式返回查询的所有结果 |
| first() | 返回查询的第一个结果，如果未查到，返回None |
| first\_or\_404() | 返回查询的第一个结果，如果未查到，返回404 |
| get() | 返回指定主键对应的行，如不存在，返回None |
| get\_or\_404() | 返回指定主键对应的行，如不存在，返回404 |
| count() | 返回查询结果的数量 |
| paginate() | 返回一个Paginate对象，它包含指定范围内的结果 |


### 使用示例

返回名字等于wang的所有人：

```
User.query.filter_by(name='wang').all()
```

all()返回查询到的所有对象：

```
User.query.all()
```
