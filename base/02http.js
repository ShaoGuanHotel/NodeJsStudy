var http = require('http')
var os = require('os')
var server = http.createServer()
server.on('request', (req, res) => {
    const {
        url
    } = req
    let resEdn = url
    if (url === '/products') {
        const products = [{
            name: '苹果1'
        },
        {
            name: '苹果2'
        },
        {
            name: '苹果3'
        },
        ]
        resEdn = JSON.stringify(products)
    }
    if (url === '/chinese') {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')
        resEdn = 'hello 中文'
    }
    if(url === '/html'){
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        resEdn = '<p>test P标签</p>'
    }
    res.end(resEdn)
})

server.listen(3000, () => {
    console.log('服务启动成功')
})

// console.log(os.cpus())
// console.log(os.totalmem())