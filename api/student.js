var http = require('http');
var mysql = require('mysql');
var CRUD = require('mysql-crud');

var connection = mysql.createPool({
    database : 'crudDB',
    user     :  'root',
    password :  '',
    host     :  'localhost'
});

var studentCRUD = CRUD(connection, 'student');
/***********For Add student detail into database***********/ 
exports.student = function(req, res){
        console.log(req.body);
        studentCRUD.create({
            'fname':req.body.firstname,
            'lname':req.body.lastname,
            'mobile':req.body.number,
            'email':req.body.email,
            'age':req.body.age
            
        }, function(err, val){
            if(err){
                console.log(err);
            }else{
                res.jsonp(val);
                console.log('added');
            }
        });
    };
/***********./Add student detail into database***********/ 

/***********For Showing All Details of Students in the List***********/ 
    exports.allstudent = function(req, res){
        studentCRUD.load({
        }, function(err, val){
            if(err){
                console.log(err);
            }else{
                res.jsonp(val);
            }
        });
    };
/***********./For Showing All Details of Students in the List***********/ 

/***********For updating students details from database**************/ 
exports.updateStudent = function(req, res) {
     var id=req.params.id;
    console.log(req.body);
    studentCRUD.update({'id':id},{
        'fname':req.body.fname,
        'lname':req.body.lname,
        'mobile':req.body.mobile,
        'email':req.body.email,
        'age':req.body.age
    }, function(err, val){
        if(parseInt(val.affectedRows)>0){
        var resdata={status:true,
            message:'Student successfully updated'};
	  	res.jsonp(resdata);
	  	}else{
	  		 var resdata={status:false,
  		      message:'record not updated'};
	  	      res.jsonp(resdata);
	  	     }
      });
   };
/***********./For updating students details from database**************/ 

/***********For showing details of perticular students**************/ 
   exports.studentdetail = function(req, res) {
    var id=parseInt(req.params.id);
      studentCRUD.load({id:id}, function (err, val) { 
        res.jsonp(val[0]);
      });  
   }; 
/***********./For showing details of perticular students**************/ 

/***********For delete of students list from database**************/ 
exports.deleteStudent = function(req, res){
    var student_id = parseInt(req.params.id);
    studentCRUD.destroy({'id':student_id}, function(err, vals){
        console.log(vals.affectedRows);
        if(parseInt(vals.affectedRows)>0){
            var resdata = {status:true,
            message:'Student List Successfully Deleted'};
            res.jsonp(resdata);
        }else{
            var resdata = {status:false,
            message:'record not found'};
            res.jsonp(resdata);
        }
    });
};
