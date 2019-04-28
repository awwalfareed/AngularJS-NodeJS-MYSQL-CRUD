var connect = require('connect');
var app = connect();
var bodyParser = require('body-parser');
var serverStatic = require('serve-static');
var path = require('path');
var app = require('express')();

app.use(bodyParser.json({ limit: '50mb', extended: true, type:'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, type:'application/x-www-form-urlencoding' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ limit: '50mb' }));


var http = require("http").createServer(app);
var public = connect();

public.use(serverStatic('public'));
app.use('/',public);


var api = require ('./api/employee');

app.get('/api/allemployee', api.viewemployee);


app.listen(3000, function(){
    console.log("Awesome!! Server Started on Port 3000...");
});