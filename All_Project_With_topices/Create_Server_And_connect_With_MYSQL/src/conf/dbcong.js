const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"2424",
    database:"mydb"
});

connection.connect((err)=>{
    if(err){
        console.log("Error to connect DB");
        return;
    }
    console.log("Connect With Db")
});