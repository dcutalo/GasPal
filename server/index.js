const express = require('express');
const connectionRequest = require('./connectionRequest');
const app = express()
const port = 5000

connection = connectionRequest();
/*connection.query('SELECT * from car', function (err, rows, fields) {
    if (err) throw err

    console.log(rows)
})*/

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

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.get('/g', (req, res) => {
    res.send('Goodbye!')
})

app.get('/users', (req, res) => {
    return res.send('GET HTTP method on user');
});

app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user');
});

app.put('/users', (req, res) => {
    return res.send('PUT HTTP method on user');
});

app.delete('/users', (req, res) => {
    return res.send('DELETE HTTP method on user');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})