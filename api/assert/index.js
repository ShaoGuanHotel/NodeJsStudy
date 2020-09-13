const assert = require('assert').strict
// assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, 3]], 4, 5]);
try{
  assert.strictEqual(2,'3','aaaaaaaa')
}catch(error){
  for(let key in error){
    console.log(`${key}      :     ${error[key]}`)
  }
}