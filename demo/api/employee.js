var http = require('http');
var mysql = require('mysql');
var CRUD = require('mysql-crud');

var connection = mysql.createPool({
    database : 'crudDB',
    user     :  'root',
    password :  '',
    host     :  'localhost'
});

var employeeCRUD = CRUD(connection, 'tbl_emp');

exports.viewemployee = function(req, res){
    employeeCRUD.load({},function(err, val){
        if(err){
            console.log(err);
        }else{
            res.jsonp(val);
        }
    });
};