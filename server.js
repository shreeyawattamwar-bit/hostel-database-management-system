const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();

/* Middleware */

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));


/* Database Connection */

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"",
database:"hostel_db"
});

db.connect(err=>{

if(err){
console.log("Database connection failed");
throw err;
}

console.log("MySQL Connected");

});


/* GET ALL STUDENTS */

app.get("/students",(req,res)=>{

db.query("SELECT * FROM students",(err,result)=>{

if(err){
res.status(500).send(err);
return;
}

res.json(result);

});

});


/* ADD STUDENT */

app.post("/add-student",(req,res)=>{

const {name,mobile,room}=req.body;

db.query(
"INSERT INTO students(name,mobile,room) VALUES(?,?,?)",
[name,mobile,room],

(err)=>{

if(err){
res.status(500).send(err);
return;
}

res.send("Student Added");

});

});


/* DELETE STUDENT */

app.delete("/delete-student/:id",(req,res)=>{

const id=req.params.id;

db.query(
"DELETE FROM students WHERE id=?",
[id],

(err)=>{

if(err){
res.status(500).send(err);
return;
}

res.send("Student Deleted");

});

});


/* MARK OUT */

app.post("/mark-out/:id",(req,res)=>{

const id=req.params.id;

db.query(
"INSERT INTO gate_pass(student_id,status) VALUES(?,'OUT')",
[id],

(err)=>{

if(err){
res.status(500).send(err);
return;
}

res.send("Marked OUT");

});

});


/* MARK IN */

app.post("/mark-in/:id",(req,res)=>{

const id=req.params.id;

db.query(
"UPDATE gate_pass SET status='IN' WHERE student_id=? ORDER BY gate_id DESC LIMIT 1",
[id],

(err)=>{

if(err){
res.status(500).send(err);
return;
}

res.send("Marked IN");

});

});


/* GET STUDENT STATUS */

app.get("/student-status/:id",(req,res)=>{

const id=req.params.id;

db.query(
"SELECT status FROM gate_pass WHERE student_id=? ORDER BY gate_id DESC LIMIT 1",
[id],

(err,result)=>{

if(err){
res.status(500).send(err);
return;
}

if(result.length===0){

res.json({status:"IN"});

}else{

res.json({status:result[0].status});

}

});

});


/* STUDENT LOGIN API */

app.post("/student-login",(req,res)=>{

const {student_id,password}=req.body;

db.query(
"SELECT * FROM student_login WHERE student_id=? AND password=?",
[student_id,password],

(err,result)=>{

if(err){
res.status(500).send(err);
return;
}

if(result.length>0){

res.json({
success:true,
message:"Login successful"
});

}else{

res.json({
success:false,
message:"Invalid Student ID or Password"
});

}

});

});


/* START SERVER */

app.listen(3000,()=>{

console.log("Server running at http://localhost:3000");

});