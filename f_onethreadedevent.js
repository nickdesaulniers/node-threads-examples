var thread = require('threads_a_gogo').create();
thread.load(__dirname + '/eventedchild.js');

// Emit 'giveMeTheFibo' to the child thread.
thread.emit('giveMeTheFibo', 35);

// Listener for the 'theFiboIs' events emitted by the child thread.
thread.on('theFiboIs', function cb (data) {
  process.stdout.write(data);
  this.emit('giveMeTheFibo', 35);
});

(function spinForever () {
  process.stdout.write('.');
  process.nextTick(spinForever);
})();
