var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('ouch', { title: 'Cyua' });
});

router.get('/test', function(req, res, next){
	res.render('index', {title:'test'});
});

//router.get('/ouch', function(req, res, next){
//	res.render('ouch', {title:'ouch'});
//});

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


router.post('/request/position2', function(req, res){
	var rawName = req.body.name;
	var Shikigami = global.dbHandle.getModel("shikigamis");
	var Mohus = global.dbHandle.getModel("mohus");
	var sendData = {
		"name": null,
		"position":[]
	};
	Shikigami.findOne({name: rawName}, function(err, doc){
		if(err){
			console.log("outer: " + err);
			res.sendStatus(500);
		}else if(!doc){
			Mohus.findOne({name: rawName}, function(err, doc1){		//找模糊词和拼音
				if(err){
					console.log("inner: " + err);
					res.sendStatus(500);
				}else if(!doc1){
					console.log("[DEBUG]failed name: " + rawName);
					res.sendStatus(404);
				}else{
					var realnameList = doc1.real;
					if(realnameList.length == 1){		//模糊名对应的只有一个式神
						var realname = realnameList[0];
						Shikigami.findOne({name: realname}, function(err, doc2){
							if(err){
								console.log("inner: " + err);
								res.sendStatus(500);
							}else if(!doc2){
								console.log("[ERROR] failed name unbelievable: " + rawName);
								res.sendStatus(404);
							}else{
								sendData.name = doc2.name;
								for(var i = 0; i < doc2.position.length; i++){
									sendData.position.push(doc2.position[i]);	
								}
								var sendDatas = [sendData];
								res.writeHead(200, {'Content-Type': 'application/json'});
								res.end(JSON.stringify(sendDatas));
							}
						});
					}else{
						Shikigami.find({name:{$in:realnameList}}, function(err, doc2){
							if(err){
								console.log("inner: "+err);
								res.sendStatus(500);
							}else if(!doc2){
								console.log("[ERROR] failed name unbelievable: " + rawName);
								res.sendStatus(404);
							}else{
								var sendDatas = []
								for(var i = 0; i < doc2.length; i++){
									var sendData = {
										'name':'None',
										'position':[],
									};
									sendData.name = doc2[i].name;
									sendData.position = [];
									for(var j = 0; j < doc2[i].position.length; j++){
										sendData.position.push(doc2[i].position[j]);
									}
									sendDatas.push(sendData);
								}
								res.writeHead(200, {'Content-Type': 'application/json'});
								res.end(JSON.stringify(sendDatas));
							}
						});
					}	
				}
			});
		}else{
			sendData.name = doc.name;
			for(var i = 0; i < doc.position.length; i++){
				sendData.position.push(doc.position[i]);
			}
			var sendDatas = [sendData];
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(sendDatas));
		}
	});
});

module.exports = router;
