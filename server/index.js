const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
    const myQuery = `SELECT * FROM movie_review`;
    db.query(myQuery, (err, result) => {
        res.send(result);
    });
});

app.post("/api", (req, res) => {
    const { movieName, movieReview } = req.body;
    const myQuery = `INSERT INTO movie_review (movieName, movieReview) VALUES (?,?)`;
    db.query(myQuery, [movieName, movieReview], (err, result) => {
        if (err) {
            console.log("Error => ", err);
            res.send("Query Process Complete!");
        } else {
            res.send(result);
        }
    });
});

app.delete("/api", (req, res) => {
    console.log("in delete", req.body);
    const { id } = req.body;
    const myQuery = `DELETE FROM movie_review WHERE id = ?`;
    db.query(myQuery, [id], (err, result) => {
        if (err) {
            console.log("Error => ", err);
            res.send("Query Process Complete!");
        } else {
            res.send("delete");
        }
    });
});

app.listen(3001, () => {
    console.log("Server running on 3001 🚀🚀");
});

var sql = "UPDATE employees SET ?,?,? where  id=?";
// var sql = `
// UPDATE employees SET
// first_name = "${first_name}",
// lname ="${lname}",
// phone ="${phone}",
// where  id= "${id}",
// `;
// var sql = "UPDATE employees SET ffname = 'SWAPNIL', WHERE first_name = 'Valley 345'";

// con.query(sql,[fname,lname,email,phone,pass,money,comment],function(error,result){
con.query(
    sql,
    [fname, lname, phone, id],
    { fname: fname, lname: lname, phone: phone },
    function (error, result) {
        if (error) console.log(error);
        res.redirect("/employees");
    }
);
