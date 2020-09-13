var fs = require('fs')
const fileUrl = './db/students.json'

function search(params = {}) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileUrl, 'utf-8', (err, data) => {
            if (err) {
                reject('read student.json error')
            }
            let result = JSON.parse(data).students

            // 过滤
            Object.keys(params).forEach(key => {
                result = result.filter(item => item[key].includes(params[key]))
            })
            resolve(result)
        })
    })
}

function find(params = {}) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileUrl, 'utf-8', (err, data) => {
            if (err) {
                reject('read student.json error')
            }
            let result = JSON.parse(data).students

            // 过滤
            Object.keys(params).forEach(key => {
                result = result.filter(item => item[key] === params[key])
            })
            resolve(result)
        })
    })
}
// CDRU
// create
function create(params) {
    return new Promise((resolve, reject) => {
        search().then(students => {
            const lastStu = students[students.length - 1]
            params.id = parseInt(lastStu.id + 1)
            students.push(params)
            fs.writeFile(fileUrl, JSON.stringify({
                students
            }), err => {
                err ? reject(err) : resolve('Create success')
            })
        })
    })
}
// remove 
function remove(id) {
    return new Promise((resolve, reject) => {
        search().then(students => {
            students = students.filter(stu => parseInt(stu.id) !== parseInt(id))
            fs.writeFile(fileUrl, JSON.stringify({
                students
            }), err => {
                err ? reject(err) : resolve({
                    code: 1,
                    msg: 'Delete success'
                })
            })
        })
    })
}
// update
function update(params = {}) {
    return new Promise((resolve, reject) => {
        search().then(students => {
            const toBeUpdateStu = students.find(stu => stu.id === params.id)
            toBeUpdateStu && Object.assign(toBeUpdateStu, params) // 更新值
            fs.writeFile(fileUrl, JSON.stringify({
                students
            }), err => {
                err ? reject(err) : resolve('update success')
            })
        })
    })
}

module.exports = {
    search,
    create,
    remove,
    update,
    find,
}