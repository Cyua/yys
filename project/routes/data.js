var express = require('express');
var router = express.Router();

router.post('/position', function(req, res){
	return;
	var name = req.body.name;
	var pinyin = req.body.pinyin;
	var pos = req.body.position;
	var Shikigami = global.dbHandle.getModel('shikigamis');
	var data = {
		'name':name,
		'pinyin':pinyin,
		'position':pos,
		'clue':[],
	};
	var record = new Shikigami(data);
	record.save(function(err){
		if(err)
			console.log(err);
		else
			res.sendStatus(200);
	});
});


router.post('/clue', function(req, res){
	return;
	var pinyin = req.body.pinyin;
	var clue = req.body.clue;
	var Shikigami = global.dbHandle.getModel('shikigamis');
	Shikigami.findOne({'pinyin':pinyin}, function(err, doc){
		if(err){
			console.log(err);
			res.sendStatus(500);
		}else if(!doc){
			res.sendStatus(404);
		}else{
			doc.clue = clue;
			doc.save(function(err){
				if(err){
					console.log(err);
					res.sendStatus(500);
				}else{
					res.sendStatus(200);
				}
			});
		}
	});
});


router.post('/mohu', function(req, res){
	var fake = req.body.fake;
	var real = req.body.real;
	var Mohus = global.dbHandle.getModel('mohus');
	Mohus.find({name: fake}, function(err, doc){
		if(err){
			console.log(err);
			res.sendStatus(500);
		} else if(!doc){
			var units = new Mohus({
				"name":fake,
				"real":[real],
			});
			units.save(function(err){
				if(err){
					console.log(err);
					res.sendStatus(500);
				}else{
					res.sendStatus(200);
				}
			});
		} else {
			doc.real.push(real);
			doc.save(function(err){
				if(err){
					console.log(err);
					res.sendStatus(500);
				}else{
					res.sendStatus(200);	
				}
			});
		}
	});
});

module.exports = router;
