const ah = require('async_hooks');
console.log(`asyncId ${ah.executionAsyncId()} triggerId ${ah.triggerAsyncId()}`);

ah.createHook({
  init() {}
}).enable(); // PromiseHooks 会被强制开启
Promise.resolve(1729).then(() => {
  console.log(`asyncId ${ah.executionAsyncId()} triggerId ${ah.triggerAsyncId()}`);
});