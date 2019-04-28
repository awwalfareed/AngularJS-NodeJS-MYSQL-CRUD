
var connect = require('connect');
var app = connect();
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var path = require('path');
var app = require('express')();

app.use(bodyParser.json({ limit: '50mb', extended: true, type:'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, type:'application/x-www-form-urlencoding' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ limit: '50mb' }));

var http = require("http").createServer(app);
var public = connect();
var api = require('./api/student');

public.use(serveStatic('public'));
app.use('/',public);


app.post('/api/student',api.student);
app.get('/api/allstudent',api.allstudent);
app.post('/api/studentUpdate/:id', api.updateStudent);
app.get('/api/studentDetail/:id', api.studentdetail);
app.get('/api/deleteStudents/:id', api.deleteStudent);




app.listen(7000, function(){
    console.log("Server started on 7000....");
});