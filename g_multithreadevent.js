var numThreads = 10;
var threadPool = require('threads_a_gogo').createPool(numThreads);
threadPool.load(__dirname + '/eventedchild.js');

// Emit 'giveMeTheFibo' to the child threads.
threadPool.all.emit('giveMeTheFibo', 35);

// Listener for the 'theFiboIs' events emitted by the child thread.
threadPool.on('theFiboIs', function cb (data) {
  process.stdout.write(data);
  this.emit('giveMeTheFibo', 35);
});

(function spinForever () {
  process.stdout.write('.');
  process.nextTick(spinForever);
})();
