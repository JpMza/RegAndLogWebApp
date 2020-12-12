// var application_root = __dirname,
// 	path 	= require("path");

var app = require('express')();
	
var	server = require('http').createServer(app);
var io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["regandlop-app-header"],
    credentials: true
  }
});

app.get('/', (req, res) => {
    res.send('<h1>Web socket on</h1>');
  });



///DATA
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

io.on('connection', function (socket) {
	console.log("conected");
	setInterval(function(){
		var data = getRandomInt(0,100);
		io.sockets.emit('pushdata', data);
	},10000);
    
    socket.on('disconnect', () => {
        console.log('disconnected');
      });
});



server.listen(8570, () => {
    console.log('Server is listening on port 8570...');
});