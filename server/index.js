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
    const car_id = req.body.car_id
    const queryString = "INSERT INTO trip (car_id, username, start_adr, end_adr, distance) VALUES (?,?,?,?,?);"
    
    connection.query(queryString, [car_id, username, start_adr, end_adr, distance], function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Insert succesful');
        }
    })
});

//delete
app.delete('/trips/delete', (req, res) => {
    const trip_id = req.body.trip_id
    const queryString = "DELETE FROM trip WHERE trip_id = ?"
    connection.query(queryString, [trip_id], function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Succesfully removed trip');
        }
    })
});

//do we need update for trips or just have user make new one?
app.put("/trips/update", (req, res) => {
    const username = req.body.username
    const start_adr = req.body.start_adr
    const end_adr = req.body.end_adr
    const distance = req.body.distance
    const queryString = `UPDATE trip SET start_adr = ${start_adr} and end_adr = ${end_adr} and distance = ${distance} WHERE username = "${username}";`

    connection.query(queryString, function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Update succesful');
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

//update (need userID to update?)
app.put("/users/update", (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const queryString = `UPDATE user SET username = ${username} and email = ${email} WHERE username = "${username}" and email = "${email}";`

    connection.query(queryString, function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Update succesful');
        }
    })
});

//delete
app.delete('/users/delete', (req, res) => {
    const username = req.body.username
    const queryString = "DELETE FROM user WHERE username = ?"
    connection.query(queryString, [username], function (err, rows,fields) {
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

app.put("/users/updateUsername", (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const queryString = `UPDATE user SET username = "${username}" WHERE email = "${email}";`

    connection.query(queryString, [username, email], function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Insert succesful');
        }
    })
});

app.put("/users/updateEmail", (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const queryString = `UPDATE user SET email = "${email}" WHERE username = "${username}";`

    connection.query(queryString, [username, email], function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Insert succesful');
        }
    })
});
//end

//car table (needs put, delete)
app.get('/cars/:car_id', (req, res) => {
    const queryString = "SELECT * from car WHERE car_id = ?"
    connection.query(queryString, [req.params.car_id], function (err, rows, fields) {
        
        if (err) throw err

        return res.json(rows);
    })
});

//insert
app.post("/cars/insert", (req, res) => {
    const make = req.body.make
    const model = req.body.model
    const year = req.body.year
    const trim = req.body.trim
    const package = req.body.package
    const tank_max = req.body.tank_max
    const queryString = "INSERT INTO car (make, model, year, trim, package, tank_max) VALUES (?,?,?,?,?,?);"

    connection.query(queryString, [make, model, year, trim, package, tank_max], function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Insert succesful');
        }
    })
});

//update
app.put("/cars/update", (req, res) => {
    const car_id = req.body.car_id
    const make = req.body.make
    const model = req.body.model
    const year = req.body.year
    const trim = req.body.trim
    const package = req.body.package
    const tank_max = req.body.tank_max
    const queryString = `UPDATE car SET make = ${make} and model = ${model} and year = ${year} 
                        and trim = ${trim} and package = ${package} and tank_max = ${tank_max} WHERE car_id = "${car_id}";`

    connection.query(queryString, function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Update succesful');
        }
    })
});

//delete
app.delete('/cars/delete', (req, res) => {
    const car_id = req.body.car_id
    const queryString = "DELETE FROM car WHERE car_id = ?"
    connection.query(queryString, [car_id], function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Succesfully removed car');
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

//user_owned_car (needs delete)
app.get('/usercars/:username', (req, res) => {
    const queryString = "SELECT * from user_owned_car WHERE username = ?"
    connection.query(queryString, [req.params.username], function (err, rows, fields) {

        if (err) throw err

        return res.json(rows);
    })
});

app.post("/usercars/insert", (req, res) => {
    const username = req.body.username
    const car_id = req.body.car_id
    const color = req.body.color
    const current_fuel = req.body.current_fuel
    const queryString = "INSERT INTO user_owned_car (username, car_id, color, current_fuel) VALUES (?,?,?,?);"

    connection.query(queryString, [username, car_id, color, current_fuel], function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Insert succesful');
        }
    })
});

app.put("/usercars/update", (req, res) => {
    const username = req.body.username
    const car_id = req.body.car_id
    const color = req.body.color
    const current_fuel = req.body.current_fuel
    const queryString = `UPDATE user_owned_car SET current_fuel = ${current_fuel} WHERE username = "${username}" and car_id = ${car_id} and color = "${color}";`

    connection.query(queryString, function (err, rows, fields) {
        if (err) {
            throw err
        }
        else {
            return res.json('Update succesful');
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