console.log('a start')
require('./b.js')
require('./c.js') // 只加载一次
console.log('a end')