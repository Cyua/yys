var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cyua' });
});


router.post('/request/position', function(req, res){
	var rawName = req.body.name;
	var Shikigami = global.dbHandle.getModel("shikigamis");
	var sendData = {
		"name": null,
		"position":[]
	};
	Shikigami.findOne({name: rawName}, function(err, doc){
		if(err){
			console.log("outer: "+err);
			res.sendStatus(500);
		}else if(!doc){
			Shikigami.findOne({pinyin: rawName}, function(err, doc){
				if(err){
					console.log("inner: "+err);
					res.sendStatus(500);
				}else if(!doc){			//根据名字和拼音都没有找到，当作线索来处理
					console.log("Failed request name: " + rawName);
					res.sendStatus(404);
				}else{
					sendData.name = doc.name;
					for(var i = 0; i < doc.position.length; i++){
						sendData.position.push(doc.position[i]);
					}
					res.writeHead(200, {'Content-Type': 'application/json'});
					res.end(JSON.stringify(sendData));
				}
			});
		}else{
			sendData.name = doc.name;
			for(var i = 0; i < doc.position.length; i++){
				sendData.position.push(doc.position[i]);
			}
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(sendData));
		}
	});
});

module.exports = router;
