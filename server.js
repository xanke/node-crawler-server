var express = require('express')
var bodyParser = require('body-parser')

var crypto = require('crypto');
var md5 = crypto.createHash('md5');


var tool = require('./lib/tool')

var app = express()

var iconv   = require('iconv-lite')
var cheerio = require('cheerio')
 
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, sessionId, authKey, Accept, Content-Type, Origin");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});




//启动扫描
app.post('/scan', urlencodedParser, function (req, resFn) {





  if (!req.body) return resFn.sendStatus(400)

  let body = req.body
  

  // console.log(body.url)
  // return

  // let nBody = {}

  // for (k in body) {
  //   if (k.length > 100) {
  //     nBody = k
  //     nBody = JSON.parse(nBody)
  //     body = nBody
  //   }
  // }




  // }
  


  let {url, model, oid} = body



  model = JSON.parse(model)


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

      model.forEach((item) => {
        // console.log(item)
        $(item.find).each(($index, $item) => {
          $item = $($item)
          let json = {}

          //遍历元素
          item.child.forEach((item) => {
            json[item.name] = []

            //遍历方法
            item.method.forEach((mItem) => {
              let {find, attr} = mItem
              let val = $item.find(find)

              if (attr) {
                val = val.attr(attr)
              } else {
                val = val.text()
              }
              json[item.name].push(val)
            })
            json[item.name] = json[item.name][0]
          })
          nArr.push(json)
        })
      })
    }

    let ret = {
   
      oid,
      url,
      length: nArr.length,
      hash: require('crypto').createHash('md5').update(JSON.stringify(nArr)).digest('hex'),
      arr: nArr
   
    }
    resFn.json(ret)
  }, function(err) {
    resFn.json(err)
  })
})

var server = app.listen(1112, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
