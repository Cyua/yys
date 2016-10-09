var express = require('express');
var router = express.Router();

router.post('/position', function(req, res){
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
			doc.save();
			res.sendStatus(200);
		}
	});
});

module.exports = router;
