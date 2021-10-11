const express = require('express');
const connectionRequest = require('./connectionRequest');
const app = express()
const port = 5000

connection = connectionRequest();
/*connection.query('SELECT * from car', function (err, rows, fields) {
    if (err) throw err

    console.log(rows)
})*/

//trip table (needs post, put, delete)
app.get('/trips/:user', (req, res) => {
    const queryString = "SELECT * from trip WHERE username = ?"
    connection.query(queryString, [req.params.user], function (err, rows, fields) {
        
        if (err) throw err
        
        return res.json(rows);
    })
});

app.get('/trips', (req, res) => {
    const queryString = "SELECT * from trip"
    connection.query(queryString, function (err, rows, fields) {
        
        if (err) throw err
        
        return res.json(rows);
    })
});
//end

//user table (needs put)
app.get('/users/:username', (req, res) => {
    const queryString = "SELECT * from user WHERE username = ?"
    connection.query(queryString, [req.params.username], function (err, rows, fields) {

        if (err) throw err

        return res.json(rows);
    })
});
//insert
app.get('/users/:username/:email', (req, res) => {
    const queryString = "INSERT INTO user (username, email) VALUES (?,?);"
    connection.query(queryString, [req.params.username, req.params.email], function (err, rows, fields) {
            if (err) {
                throw err
            }
            else {
                return res.json('Insert succesful');
            }
        })
});
//delete
app.get('/userdelete/:username', (req, res) => {
    const queryString = "DELETE FROM user WHERE username = ?"
    connection.query(queryString, [req.params.username], function (err, rows,fields) {
            if (err) {
                throw err
            }
            else {
                return res.json('Succesfully removed user');
            }
    })
});

app.get('/users', (req, res) => {
    const queryString = "SELECT * from user"
    connection.query(queryString, function (err, rows, fields) {

        if (err) throw err

        return res.json(rows);
    })
});
//end

//car table (needs post, put, delete)
app.get('/cars/:car_id', (req, res) => {
    const queryString = "SELECT * from car WHERE car_id = ?"
    connection.query(queryString, [req.params.car_id], function (err, rows, fields) {
        
        if (err) throw err

        return res.json(rows);
    })
});

app.get('/cars', (req, res) => {
    const queryString = "Select * from car"
    connection.query(queryString, function (err, rows, fields) {

        if (err) throw err

        return res.json(rows);
    })
});
// end

//user_owned_car (needs post, put, delete)
app.get('/usercars/:username', (req, res) => {
    const queryString = "SELECT * from user_owned_car WHERE username = ?"
    connection.query(queryString, [req.params.username], function (err, rows, fields) {

        if (err) throw err

        return res.json(rows);
    })
});

app.get('/usercars', (req, res) => {
    const queryString = "Select * from user_owned_car"
    connection.query(queryString, function (err, rows, fields) {

        if (err) throw err

        return res.json(rows);
    })
});
//end

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})