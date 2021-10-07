const express = require('express')
const app = express()
const port = 3000

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