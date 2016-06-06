var express = require('express');
var router = express.Router();
var http =  require('http');

/*
 * GET init.
 */
router.get('/', function(req, res) {
  res.json({"statut" : "rien a voir ici."});
});

/*
router.get('/init', function(req, res) {
  var pool = req.pool;
	pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select * from instance_action",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
});

router.get('/:codeappareil/:codeaction', function(req, res) {

  io.on('connection', function (socket) {
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
      path: "?codeAppareil="+req.params.codeappareil+"&codeAction="+req.params.codeaction+"&timestamp=20160101225900"
    };


var varretour = http.request(options, function(retour) {

    console.log('STATUS: ' + retour.statusCode);
    console.log('HEADERS: ' + JSON.stringify(retour.headers));
    retour.setEncoding('utf8');
    //console.log('BODY: ' + JSON.stringify(retour.body));
    //retour.json(JSON.stringify(retour.body));
    
    retour.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
      socket.emit('statut_action', { id: req.params.codeappareil, statut: chunk });
    });


  });

  varretour.on('error', function(e)
  {
      console.log('\n\n==========ERROR==============')
      console.log('problem with request: ' + e.message);
      res.json({"success":false});
  });

  varretour.end();

  res.json({"success":true});
  });
});

 

  //res.json({"codeappareil":req.params.codeappareil, "codeaction":req.params.codeaction, "success":bmpString});
	return;
});
*/

module.exports = router;
