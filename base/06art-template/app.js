// https://github.com/aui/art-template
var template = require('art-template')
var http = require('http')
var fs = require('fs')
http
    .createServer()
    .on('request', (rep, res) => {
        fs.readFile('./template.html', (err, data) => {
            res.end(template.render(data.toString(), {
                name: 'jack',
                likes: ['a', '篮球', 'Hotel'],
                age: 18,
                province: '广东'
            }))
        })
    })
    .listen(3000, () => {
        console.log('3000 服务启动成功')
    })

var test = template.render('hello {{name}}', {
    name: 'hotel'
})