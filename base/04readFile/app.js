var http = require('http')
var fs = require('fs')

// http://tool.oschina.net/
http
    .createServer()
    .on('request', (req, res) => {
        var { url } = req
        if (url === '/') {
            fs.readFile('./views/index.html', (err, data) => {
                if (err) {
                    res.end('文件读取失败,请稍后重试!')
                } else {
                    res.end(data)
                }
            })
        }
    })
    .listen(3000, () => {
        console.log('服务3000 启动成功')
    })
