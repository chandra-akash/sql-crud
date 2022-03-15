const express = require("express");
const Router = express.Router();
const mysqlconnection = require("../connection");

Router.get("/", function (req, res) {
  // writes something
  mysqlconnection.query("SELECT * from employee", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});


Router.post('/',(req, res) => {
    let data = {first_name: req.body.first_name, last_name: req.body.last_name,dob:req.body.dob};
    
    let sqlQuery = "INSERT INTO employee SET ?";
    
     let query=mysqlconnection.query(sqlQuery, data,(err, results) => {
         console.log("hi iam at line23");
      if(err) throw err;
      res.send(apiResponse(results));
    });
   
  });

  Router.put('/:id',(req, res) => {
    let sqlQuery = "UPDATE employee SET first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"',dob='"+req.body.dob+"' WHERE id="+req.params.id;
    
    let query =mysqlconnection.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

  Router.delete('/:id',(req, res) => {
    let sqlQuery = "DELETE FROM employee WHERE id="+req.params.id+"";
      
    let query = mysqlconnection.query(sqlQuery, (err, results) => {
      if(err) throw err;
        res.send(apiResponse(results));
    });
  });
     



  function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}
module.exports = Router;