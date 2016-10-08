var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cyua' });
});


router.post('/request/position', function(req, res){
	var name = req.body.name;
	console.log(name);
	res.sendStatus(200);
});

module.exports = router;
