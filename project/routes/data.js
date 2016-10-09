var express = require('express');
var router = express.Router();

router.post('/position', function(req, res){
	var name = req.body.name;
	var pinyin = req.body.pinyin;
	var pos = req.body.position;
	console.log("name: "+name);
	console.log("pinyin: "+pinyin);
	console.log("position: "+pos);
	return;	
});

module.exports = router;
