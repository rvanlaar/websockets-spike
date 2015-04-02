var docentUri = 'wss://stark-badlands-9229.herokuapp.com/submit';
var digibordUri = 'wss://stark-badlands-9229.herokuapp.com/receive';

function logDocent(data) {
	console.log('docent: ' + data);
}

function docentEventLog(eventType){
	return function() {
		logDocent(eventType)
	}
}

var docentSocket = new ReconnectingWebSocket(docentUri);
docentSocket.onopen = docentEventLog('onopen');
docentSocket.onclose = docentEventLog('onclose');
docentSocket.onmessage = docentEventLog('onmessage');
docentSocket.onerror = docentEventLog('onerror');

function logDigibord(data) {
	console.log('digibord: ' + data);
}

function digibordEventLog(eventType) {
	return function () {
		logDigibord(eventType);
	}
}

var digibord = document.getElementById('digibord');

function digibordOnMessage(event) {
	digibord.value = event.data;
	digibordEventLog(event);
}

var digibordSocket = new ReconnectingWebSocket(digibordUri);
digibordSocket.onopen = digibordEventLog('onopen');
digibordSocket.onclose = digibordEventLog('onclose');
digibordSocket.onmessage = digibordOnMessage;
digibordSocket.onerror = digibordEventLog('onerror');


var message = document.getElementById('docent');
message.onchange = (function() {
	console.log('message: ' + this.value);
	docentSocket.send(this.value);
	this.value = '';
});
