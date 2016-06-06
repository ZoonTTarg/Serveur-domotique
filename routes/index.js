var express = require('express');
var router = express.Router();
var http =  require('http');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(443);

io.on('connection', function (socket) {
  console.log("connection");
  socket.emit('news', { hello: 'world' });
  socket
  .on('my other event', function (data) {
    console.log(data);
  })
  .on('change', function (data) {
    console.log(data);

    var options = {
      host: "192.168.0.200",
      port: 80,
      path: "?codeAppareil="+data.id+"&codeAction=A0001&timestamp=20160101225900"
    };


	var varretour = http.request(options, function(retour) {

	    console.log('STATUS: ' + retour.statusCode);
	    console.log('HEADERS: ' + JSON.stringify(retour.headers));
	    retour.setEncoding('utf8');
	    //console.log('BODY: ' + JSON.stringify(retour.body));
	    //retour.json(JSON.stringify(retour.body));
	    
	    retour.on('data', function (chunk) {
	      console.log('BODY: ' + chunk);
	      socket.emit('statut_action', { id: data.id, statut: chunk });
	    });
 	});

  varretour.on('error', function(e)
  {
      console.log('\n\n==========ERROR==============')
      console.log('problem with request: ' + e.message);
      socket.emit('statut_action', { id: req.params.codeappareil, success: false });
  });
  
  varretour.end();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile("/public/index.html");
});



module.exports = router;
