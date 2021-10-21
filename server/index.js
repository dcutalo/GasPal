const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const connectionRequest = require('./connectionRequest');
const app = express()
const port = 5000

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true}));

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

app.post("/trips/insert", (req, res) => {
    const username = req.body.username
    const start_adr = req.body.start_adr
    const end_adr = req.body.end_adr
    const distance = req.body.distance
    const queryString = "INSERT INTO trip (username, start_adr, end_adr, distance) VALUES (?,?,?,?);"
    
    connection.query(queryString, [username, start_adr, end_adr, distance], function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Insert succesful');
        }
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
//app.get
app.post("/users/insert", (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const queryString = "INSERT INTO user (username, email) VALUES (?,?);"

    connection.query(queryString, [username, email], function (err, rows, fields) {
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

app.post("/cars/insert", (req, res) => {
    const make = req.body.make
    const model = req.body.model
    const year = req.body.year
    const trim = req.body.trim
    const package = req.body.package
    const tank_max = req.body.tank_max
    const queryString = "INSERT INTO user (make, model, year, trim, package, tank_max) VALUES (?,?,?,?,?,?);"

    connection.query(queryString, [make, model, year, trim, package, tank_max], function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Insert succesful');
        }
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

app.post("/userOwnedCar/insert", (req, res) => {
    const username = req.body.username
    const color = req.body.color
    const current_fuel = req.body.current_fuel
    const queryString = "INSERT INTO user_owned_car (username, color, current_fuel) VALUES (?,?,?);"

    connection.query(queryString, [username, color, current_fuel], function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Insert succesful');
        }
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