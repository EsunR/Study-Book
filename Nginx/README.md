# 1. 安装

(官方安装文档)[https://nginx.org/en/#basic_http_features]

Install the prerequisites:

> sudo apt install curl gnupg2 ca\-certificates lsb\-release

To set up the apt repository for stable nginx packages, run the following command:

> echo "deb http://nginx.org/packages/ubuntu \`lsb\_release \-cs\` nginx" \\
>     | sudo tee /etc/apt/sources.list.d/nginx.list

If you would like to use mainline nginx packages, run the following command instead:

> echo "deb http://nginx.org/packages/mainline/ubuntu \`lsb\_release \-cs\` nginx" \\
>     | sudo tee /etc/apt/sources.list.d/nginx.list

Next, import an official nginx signing key so apt could verify the packages authenticity:
ga
> curl \-fsSL https://nginx.org/keys/nginx\_signing.key | sudo apt\-key add \-

Verify that you now have the proper key:

> sudo apt\-key fingerprint ABF5BD827BD9BF62

The output should contain the full fingerprint `573B FD6B 3D8F BC64 1079 A6AB ABF5 BD82 7BD9 BF62` as follows:

> pub   rsa2048 2011\-08\-19 \[SC\] \[expires: 2024\-06\-14\]
>       573B FD6B 3D8F BC64 1079  A6AB ABF5 BD82 7BD9 BF62
> uid   \[ unknown\] nginx signing key <signing\-key@nginx.com>

To install nginx, run the following commands:

> sudo apt update
> sudo apt install nginx

查看版本：

> nginx -v

查看执行指令：

> nginx -V


# 2. 主要配置文件

安装成功后，配置文件存放于 `/etc/nginx` 目录下的 `nginx.conf` 文件中，默认配置如下：

```
user www-data;
worker_processes auto;
pid /run/nginx.pid;

events {
	worker_connections 768;
	# multi_accept on;
}

http {

	##
	# Basic Settings
	##

	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;
	# server_tokens off;

	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# SSL Settings
	##

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

	gzip on;
	gzip_disable "msie6";

	# gzip_vary on;
	# gzip_proxied any;
	# gzip_comp_level 6;
	# gzip_buffers 16 8k;
	# gzip_http_version 1.1;
	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

	##
	# Virtual Host Configs
	##

	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}


#mail {
#	# See sample authentication script at:
#	# http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
# 
#	# auth_http localhost/auth.php;
#	# pop3_capabilities "TOP" "USER";
#	# imap_capabilities "IMAP4rev1" "UIDPLUS";
# 
#	server {
#		listen     localhost:110;
#		protocol   pop3;
#		proxy      on;
#	}
# 
#	server {
#		listen     localhost:143;
#		protocol   imap;
#		proxy      on;
#	}
#}
```

在该文件中除了基础配置以外，又引入了两个配置文件：

```
# 引入 /etc/nginx/conf.d/ 目录下的所有以 *.config 的文件
include /etc/nginx/conf.d/*.conf;
# 引入 /etc/nginx/sites-enabled/ 目录下的所有文件
include /etc/nginx/sites-enabled/*;
```

我们将 `/etc/nginx` 目录结构输出，结果如下：

```
root@EsunR_Shinelon:/etc/nginx# tree
.
├── conf.d
├── fastcgi.conf
├── fastcgi_params
├── koi-utf
├── koi-win
├── mime.types
├── nginx.conf
├── proxy_params
├── scgi_params
├── sites-available
│   └── default
├── sites-enabled
│   └── default -> /etc/nginx/sites-available/default
├── snippets
│   ├── fastcgi-php.conf
│   └── snakeoil.conf
├── uwsgi_params
└── win-utf
```

sites-enabled 下创建了一个软连接，指向了 `/etc/nginx/sites-available/default`，这个文件就是默认的配置文件（注：根据不同的版本，有的版本的 nginx 默认配置文件存放于 `/etc/nginx/conf.d/default.conf` 中）。打开这个配置文件可以看到服务器相关的部分设置。

基础配置中，可以找到 nginx 服务器的根目录：


```
root /var/www/html;

# Add index.php to the list if you are using PHP
index index.html index.htm index.nginx-debian.html;

server_name _;

location / {
  # First attempt to serve request as file, then
  # as directory, then fall back to displaying a 404.
  try_files $uri $uri/ =404;
}
```

部分版本的 nginx 配置为：

```
location / {
  root /usr/share/nginx/html;
  index index.html index.htm;
}
```

同时我们可以指定 404 50x 的错误页面重定向，如设置一个重定向的 404 页面：

```
error_page 404 /404.html;
```

# 3. Nginx 启动、停止与重启

启动 Nginx 服务：

```
$ nginx
```

停止 Nginx 服务：

```
# 从容停止
$ nginx -s quit

# 立即停止
$ nginx -s stop
```

重启 nginx 服务：

```
$ nginx -s reload
```

# 4. 访问权限

限制某个 ip 不允许访问根目录：

```
location / {
    deny 127.0.0.1;
}
```

允许某个 ip 可以访问根目录：

```
location / {
	# 127.0.0.1 ~ 127.0.0.100 都可以访问
    allow 127.0.0.1/100;
    deny all;
}
```

> 权限判定是由上自下执行的，当 allow 与 deny 交换位置后，127.0.0.1/100 也会被拒绝访问。

如果想要精确控制某个路径，在路径前添加 `-` ：

```
# 仅仅匹配访问 /img 目录时的请求
location -/img {
	allow all;
}
```

使用正则匹配：

```
# 只要是以 .php 结尾的文件都不允许访问
location ~\.php$ {
	deny all;
}
```

# 5. 虚拟主机

虚拟主机的意思是在一台服务器上运行多个服务，通过配置，Nginx 可以帮助我们管理这些服务。通常在一个主机上运行多个服务的方案有：

- 一台主机拥有一个域名，在同一个域名下配置多个端口，如 `esunr.xyz:8000` 可以访问 app1 `esunr.xyz:8001` 可以访问 app2，我们将其称为基于端口的配置方案。
- 一台主机拥有多个域名，用户访问不同的域名可以访问到不同的应用，如 `app1.esunr.xyz` 访问 app1，`app2.esunr.xyz` 访问 app2，我们将其称为基于域名的配置方案。

## 5.1 基于端口的配置方案

我们已知在  Nginx 配置目录下的`conf.d` 文件夹存放的配置文件都会被 Nginx 服务所读取。那么我们在该目录下创建 `8001.conf` 文件用于配置 8001 端口的服务：

```
server {
  # 匹配端口为 8001 的请求
  listen 8001;
  root /var/www/html/8001;
  index index.html;
}
```

创建好如上的配置后，重启 Nginx 服务器，那么在 8001 端口也会被启用，起读取文件的根目录为 `/var/www/html/8001`。

当我们访问 `localhost:8001` 时：

![](http://study.esunr.xyz/1583502962306.png)

## 5.2 基于域名的配置方案

Nginx 服务默认运行在 80 端口，这个端口也是用户访问一个域名的默认端口号，所以最好不要向用户暴露端口号。Nginx 在接收用户请求时可以检查用户的 Host 字段，可以得知用户访问的域名是什么，于是我们就可以根据此项配置来将用户引导直不同的服务。

在配置文件中，可以设置 `server_name` 来配置不同域名的访问情况下，所读取的文件目录，以开头的例子为演示：

```
# 请求会根据配置自动匹配
server {
  listen 80;
  server_name app1.esunr.xyz;
  root /var/www/html/app1;
  index index.html
}

server {
  listen 80;
  server_name app2.esunr.xyz;
  root /var/www/html/app2;
  index index.html
}
```

这样，当用访问 `app1.esunr.xyz` 时，就会返回服务器端的 `/var/www/html/app1/index.html`。当用户访问 `app2.esunr.xyz` 时，就会返回服务器端的 `/var/www/html/app2/index.html`。

# 6. 反向代理

Nginx 拥有强大的反向代理功能，可以作为反向代理服务器使用。

> 正向代理时代理客户端的请求，将多个客户端的请求转发到一台主机上，如 SSR 技术。
>
> 反向代理时代理服务器，一个用户访问代理服务器后，请求有可能被转发到多个服务器上，因此可被用作于负载均衡。

我们可以做一个演示，当用户访问我们的域名时，我们利用 Nginx 的反向代理，将请求转发至 `https://www.baidu.com` 上：

```
server {
  listen 80;
  server_name test2.localhost.com;
  location / {
    proxy_pass https://www.baidu.com;
  }
}
```

可以看出，请求的域名并没有改变，但是实际的网页内容已经被替换为百度的内容：

![](http://study.esunr.xyz/1583505904004.png)

# 7. PC 端于移动端的适配

对于现阶段的移动端适配方案，通常有两种，分别为基于媒体查询器自适应网页，还有就是编写两套 web 端的页面。针对于第二种方案，Nginx 可以通过判断用户的访问设备类型，来自动返回给用户 PC 端的页面与移动端的页面：

```
server {
  listen 80;
  server_name test.localhost.com;
  # 匹配根目录
  location / {
    root /var/www/html/test.localhost.com;
    # 如果时移动端设备，就返回移动端网页
    if ($http_user_agent ~* 'Android|webOS|iPhone|iPod|BlackBerry') {
      root /var/www/html/mobile;
    }
    index index.html;
  }
}
```

![移动端访问效果](http://study.esunr.xyz/1583507504263.png)

# 8. Gzip 压缩

gzip是需要服务器和浏览器同事支持的。当浏览器支持gzip压缩时，会在请求消息中包含Accept\-Encoding:gzip,这样Nginx就会向浏览器发送听过gzip后的内容，同时在相应信息头中加入Content\-Encoding:gzip，声明这是gzip后的内容，告知浏览器要先解压后才能解析输出。

**gzip的配置项**

Nginx提供了专门的gzip模块，并且模块中的指令非常丰富。

*   gzip : 该指令用于开启或 关闭gzip模块。
*   gzip\_buffers : 设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。
*   gzip\_comp\_level : gzip压缩比，压缩级别是1\-9，1的压缩级别最低，9的压缩级别最高。压缩级别越高压缩率越大，压缩时间越长。
*   gzip\_disable : 可以通过该指令对一些特定的User\-Agent不使用压缩功能。
*   gzip\_min\_length:设置允许压缩的页面最小字节数，页面字节数从相应消息头的Content\-length中进行获取。
*   gzip\_http\_version：识别HTTP协议版本，其值可以是1.1.或1.0.
*   gzip\_proxied : 用于设置启用或禁用从代理服务器上收到相应内容gzip压缩。
*   gzip\_vary : 用于在响应消息头中添加Vary：Accept\-Encoding,使代理服务器根据请求头中的Accept\-Encoding识别是否启用gzip压缩。

**gzip最简单的配置**

```
http {
   .....
    gzip on;
    gzip_types text/plain application/javascript text/css;
   .....
}
```

`gzip on`是启用gizp模块，下面的一行是用于在客户端访问网页时，对文本、JavaScript 和CSS文件进行压缩输出。

配置好后，我们就可以重启Nginx服务，让我们的gizp生效了。