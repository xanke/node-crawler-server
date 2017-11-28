# node-crawler
一个基于nodejs的网站采集服务器
可部署在任何服务器上远程调用

#### DEMO
发送请求
POST: /scan
```json
{
    "url": "http://www.charlotterusse.com/shoes/shop-all-shoes?sz=30&start=0",
    "model": [{"find":".product-tile","child":[{"name":"name","type":"","method":[{"find":".name-link","attr":""}]},{"name":"price","type":"","method":[{"find":".price-sales","attr":""}]},{"name":"image","type":"","method":[{"find":"img","attr":"src"}]},{"name":"url","type":"","method":[{"find":"a","attr":"href"}]}]}],
    "oid": "7e11c4cb-0456-e9a9-65d5-b64c86d12b94"
}
```