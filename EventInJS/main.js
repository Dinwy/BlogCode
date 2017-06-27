'use strict';

const Event = require('./events.js');

function eventA (msg) {
	console.log(`eventA: Got a message, ${msg}`);
}

function eventB (msg) {
	console.log(`eventB: Got a message, ${msg}`);
}

// Add two listener which listeng the event name 'message'
Event.subscribe('message', eventA);
Event.subscribe('message', eventB);
// Listening event name 'alert'
Event.subscribe('alert', (msg) => console.log(`Got a alert, ${msg}`));

// Emit the 'message' event
Event.emit('message', 'Hello there');
console.log('------------');

// Add a listener which only listen once
Event.once('message', (msg) => console.log(`eventC: Got a message, ${msg}`));

// Emit the 'message' event
Event.emit('message', 'Are you listening?');
console.log('------------');

// Remove Event A
Event.removeListener('message', eventA);
// Emit the 'message' event again
Event.emit('message', 'Hello?');
console.log('------------');

// Emit the event
Event.emit('alert', 'Warning!');

// Results
/*
eventA: Got a message, Hello there
eventB: Got a message, Hello there
------------
eventA: Got a message, Are you listening?
eventB: Got a message, Are you listening?
eventC: Got a message, Are you listening?
------------
eventB: Got a message, Hello?
------------
Got a alert, Warning!
*/