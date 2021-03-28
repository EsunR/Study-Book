const http = require('http');
const urlModule = require('url');   //核心模块，能帮我们解析url地址，从而拿到pathname query
const server = http.createServer();
server.on('request', (req, res)=>{
    // const url = req.url;
    // 定义一个变量 url ，内容为解析出来的对象的 .pathname 部分；
    // 定义一个变量 query ，内容为解析出来的对象的 .query 部分；
    const { pathname: url, query } = urlModule.parse(req.url, true);
    console.log(urlModule.parse(req.url, true));
    if(url === '/getscript'){
        // 拼接一个合法的js脚本
        // var scriptStr = 'show()';

        var data = {
            name: 'EsunR',
            age: 8,
            gender: '汉子'
        }


        var scriptStr = `${query.callback}(${JSON.stringify(data)})`
        res.end(scriptStr);
    }else{
        res.end('404');
    }
})

server.listen(8080, ()=>{
    console.log('server listen at http://localhost:8080');
})