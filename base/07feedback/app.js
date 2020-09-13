var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')
var templateObj = {
    dataList: new Array(10)
        .fill('')
        .map((item, index) => ({ name: `hotel ${index}`, message: `消息 message ${index}`, date: `2019-10-17 00:24:35 ${index}` }))
}

http
    .createServer()
    .on('request', (req, res) => {
        const { pathname, query } = url.parse(req.url, true)
        if (pathname === '/') {
            fs.readFile('./views/index.html', (err, data) => {
                if (err) {
                    return res.end('404 index 资源没找到')
                }
                res.end(template.render(data.toString(), templateObj))
            })
        } else if (pathname === '/addMeg') {
            query.date = new Date().toString()
            templateObj.dataList.push(query)
            res.statusCode = '302'
            res.setHeader('Location','/')
            res.end()
        } else if (pathname.startsWith('/public')) {
            fs.readFile('.' + pathname, (err, data) => {
                if (err) {
                    return res.end('404 public 资源没找到')
                }
                res.end(data)
            })
        } else if (pathname === '/post') {
            fs.readFile('./views/post.html', (err, data) => {
                res.end(data)
            })
        } else {
            fs.readFile('./views/404.html', (err, data) => {
                if (err) {
                    return res.end('404 html没找到')
                }
                res.end(data)
            })
        }
    })
    .listen(3000, () => {
        console.log('3000 服务启动成功')
    })