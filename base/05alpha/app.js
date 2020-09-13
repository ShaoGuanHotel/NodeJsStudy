var http = require('http')
var fs = require('fs')
var wwwDir = 'E:/WorkPlace/NodeJs/base/alpha/www'


http
    .createServer()
    .on('request', (req, res) => {
        const { url } = req
        fs.readFile('./template.html', (err, data) => {
            if (err) return res.end('404 NOT Found')
            fs.readdir(wwwDir, (err, files) => {
                if (err) {
                    return res.end('cannot found www')
                }
                let content = ''
                files.forEach(file => {
                    content += `
                    <tr>
                        <td data-value="a/"><a class="icon dir" href="file:///E:/WorkPlace/NodeJs/base/www/a/">${file}/</a></td>
                        <td class="detailsColumn" data-value="0"></td>
                        <td class="detailsColumn" data-value="1571153247">2019/10/15 下午11:27:27</td>
                    </tr>
                    `
                });
                res.end(data.toString().replace('HotelHotel', content))
            })
        })
    })
    .listen(3000, () => {
        console.log('3000 服务启动')
    })