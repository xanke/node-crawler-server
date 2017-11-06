var express = require('express')
var bodyParser = require('body-parser')

var tool = require('./lib/tool')

var app = express()


 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

//启动扫描
app.post('/scan', urlencodedParser, function (req, resuset) {
  if (!req.body) return resuset.sendStatus(400)
  	// console.log(req.body)

  let body = req.body

  let opt = {
  	url: '//baidu.com'
  }

  let aaa = 'sb'

  tool.getWebsite(opt).then( function (body, res) {
  	// console.log(res)
  	let opt = '32'
  	console.log(opt)

  	resuset.send('32')
  	// res.send(body)
  })

  
})





 
// // POST /api/users gets JSON bodies
// app.post('/api/users', jsonParser, function (req, res) {
//   if (!req.body) return res.sendStatus(400)
//   	console.log(req.body)
//   // create user in req.body
// })


var server = app.listen(9099, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
