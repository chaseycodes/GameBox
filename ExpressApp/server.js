var express = require('express')
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const games = [
    { id: 1, name: 'chess' },
    { id: 2, name: 'tic-tac-toe' },
    { id: 3, name: 'pong' }
]

//Render index at root '/'
app.get('/', (req, res)=>{
    res.sendFile(__dirname+"/login.html")
})

app.post('/', (req, res)=>{
    var usernameLogin = req.body.usernameLogin
    var passwordLogin = req.body.passwordLogin
    var usernameRegister = req.body.usernameRegister
    var passwordRegister= req.body.passwordRegister
    var email = req.body.email
    var nickname = req.body.nickname

    console.log(usernameLogin)
    console.log(passwordLogin)
    console.log(usernameRegister)
    console.log(passwordRegister)
    console.log(email)
    console.log(nickname)
})

app.get('/select', (req, res)=>{
    res.sendFile(__dirname+"/select.html")
})

app.post('/select', (req, res)=>{
    res.sendFile(__dirname+"/select.html")
    var toggleValue = req.body.toggle

    console.log(toggleValue)
})

app.get('/game', (req, res)=>{
    res.sendFile(__dirname+"/game.html");
    //Get HTML CODE FROM FLASK
    //CREATE RENDER FUNCTION FROM HERE TO HTML
})

app.get('/games', (req, res) =>{
    res.send(games);
})


//Create Socket for Chat Connection
io.on('connection', (socket)=>{
    socket.on('chat', (msg)=>{
        io.emit('chat', msg)
    })
})

io.on('disconnect', function(){
    console.log('User Disconnected')
})

app.use(express.static('public'))

//PORT
const port = process.env.PORT || 3001;
http.listen(port, ()=>{
    console.log(`listening to port: ${port}`)
})