var superAgent= require('superagent')

function getWebsite (opt) {
  return new Promise(function (reslove, reject) {
    superAgent
      .get(opt.url)
      .set({
         'secureProtocol': 'TLSv1_method',
         'rejectUnauthorized': false,
         'cookie': opt.cookie || '',
        // Referer: opt.url,
        // 'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.7 Safari/537.36"
      })
      .end(function (err, res) {
        
        if (res) {
          if (res.status === 200 || res.status === 403 || res.status === 304) {
            reslove(res)
          }
        }
        if (err) {
          reject(err)
          return false
        }
      })
  })
}


exports.getWebsite = getWebsite
