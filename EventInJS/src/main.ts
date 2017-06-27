import { Event } from "./events"

function eventA (msg) {
	console.log(`eventA: Got a message, ${msg}`);
}

function eventB (msg) {
	console.log(`eventB: Got a message, ${msg}`);
}

const event = Event.bootstrap();
// Add two listener which listeng the event name 'message'
event.subscribe('message', eventA);
event.subscribe('message', eventB);
// Listening event name 'alert'
event.subscribe('alert', (msg) => console.log(`Got a alert, ${msg}`));

// Emit the 'message' event
event.emit('message', 'Hello there');
console.log('------------');

// Add a listener which only listen once
event.once('message', (msg) => console.log(`eventC: Got a message, ${msg}`));

// Emit the 'message' event
event.emit('message', 'Are you listening?');
console.log('------------');

// Remove event A
event.removeListener('message', eventA);
// Emit the 'message' event again
event.emit('message', 'Hello?');
console.log('------------');

// Emit the event
event.emit('alert', 'Warning!');

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