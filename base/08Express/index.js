var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.engine('html', require('express-art-template'))

//     别名 /other/ ....
app.use('/public/', express.static('./public/'))
// app.use(express.static('./public/'))
// 3000/test.jpg

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var templateObj = {
    dataList: new Array(10)
        .fill('')
        .map((item, index) => ({ name: `hotel ${index}`, message: `消息 message ${index}`, date: `2019-10-17 00:24:35 ${index}` }))
}

app.get('/', (req, res) => {
    res.render('index.html', templateObj)
})
app.get('/postPage', (req, res) => {
    res.render('post.html')
})

// express-art-template 会默认用views作为默认目录 可以用:
// app.set('views','./views copy')
app.get('/404', (req, res) => {
    res.render('404.html')
})

app.get('/admin', (req, res) => {
    res.render('admin/admin.html', {
        test: '测试'
    })
})

app.get('/addMeg', (req, res) => {
    templateObj.dataList.push({
        ...req.query,
        date: new Date().toString()
    })
    res.redirect('/')
})

app.post('/addMeg', (req, res) => {
    templateObj.dataList.push({
        ...req.body,
        date: new Date().toString()
    })
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('express server is runing')
})