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
		'position':pos
	};
	var record = new Shikigami(data);
	record.save(function(err){
		if(err)
			console.log(err);
		else
			res.sendStatus(200);
	});
});

module.exports = router;
