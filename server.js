'use strict';

var express = require('express');
var path = require('path');
var  app = express();
var indexPath = path.join(__dirname,'/Public/index.html');
var publicPath = express.static(path.join(__dirname,'/Public'));

        app.use('/public',publicPath);
        app.get('/',function(_,res){res.sendFile(indexPath)});
        app.set('json spaces', 2);



app.use('/', express.static(path.join(__dirname, "/Public")));



var port = process.env.PORT ? process.env.PORT : (process.env.NODE_ENV === 'test' ? 4000 : 3000);
console.log('running on port', port);
app.listen(port);

module.exports = app;
//              