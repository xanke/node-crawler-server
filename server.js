var express = require('express')
var bodyParser = require('body-parser')

var tool = require('./lib/tool')

var app = express()

var iconv   = require('iconv-lite')
var cheerio = require('cheerio')
 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

//启动扫描
app.post('/scan', urlencodedParser, function (req, resFn) {
  if (!req.body) return resFn.sendStatus(400)

  let body = req.body
  let {url, content, content_item} = body

  content_item = JSON.parse(content_item)

  let err = ''
  if (!url) {
    err = '无url'
  }


  if (err) {
    resFn.json(err)
  }

  let opt = {
  	url
  }

  tool.getWebsite(opt).then( function (res) {
  	

    let body = res.text

    let nArr = []

    if (typeof(body) == 'string') {

      let $ = cheerio.load(body)

      $(content).each((index, item) => {
        let cItem = $(item)

        let json = {}

        //列表采集方法
        for (let k in content_item) {
          let item = content_item[k]
          let [find, attr] = item

          let val = cItem.find(find)
          if (attr) {
            val = val.attr(attr)
          } else {
            val = val.text()
          }
          json[k] = val
        }
        nArr.push(json)
      })

    }

    let ret = {
      length: nArr.length,
      arr: nArr
    }

    resFn.json(ret)

  

  }, function(err) {
    resFn.json(err)
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
