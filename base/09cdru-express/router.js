var express = require('express')
var fs = require('fs')
var studentsDao = require('./dao/students')
var router = express.Router()

router.get('/students', (req, res) => {
    studentsDao.search().then(data => {
        res.render('index.html', {
            students: data
        })
    })
})
router.get('/students/new', (req, res) => {
    res.render('new.html')
})
router.get('/students/edit', (req, res) => {
    studentsDao.find({ id: parseInt(req.query.id) }).then(editStu => {
        res.render('edit.html', editStu[0])
    })
})

router.post('/api/new', (req, res) => {
    studentsDao.create(req.body).then(result => {
        res.redirect('/students')
    })
})
router.post('/api/add', (req, res) => {
    res.redirect('/students')
})
router.post('/api/update', (req, res) => {
    req.body.id = parseInt(req.body.id)
    studentsDao.update(req.body).then(result => {
        res.redirect('/students')
    })
})
router.get('/api/remove', (req, res) => {
    studentsDao.remove(req.query.id).then(result => {
        if (result.code === 1) {
            res.redirect('/students')
        } else {
            console.log('error')
        }
    })
})
module.exports = router