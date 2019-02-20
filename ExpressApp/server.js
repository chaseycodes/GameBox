var express = require('express')
var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
const bodyParser = require('body-parser');
var request = require('request-promise');
var mongo = require('mongodb').MongoClient;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to  MONGO
var url = 'mongodb://localhost:27017/mongochat'
mongo.connect(url, { useNewUrlParser: true }, function(err,db){
    if(err){
        throw err;
    }

    console.log('MongoDB Connected......... *8====D')

    //Create Socket for Chat Connection
    io.on('connection', ()=>{
        let chat = db.collection('chats');

        //Function to send status
        sendStatus = (s)=>{
            socket.emit('status', s);
        }

        chat.find().limit(100).sort({_id:1}).toArray((err, res)=>{
            if(err){
                throw err;
            }

            //Emit messages
            socket.emit('output', res);
        })

        i
    })

});

app.set('views', './views')
app.set('view engine', 'pug')

const games = [
    { id: 1, name: 'chess' },
    { id: 2, name: 'tic-tac-toe' },
    { id: 3, name: 'pong' }
]

//Render index at root '/'
app.get('/', (req, res)=>{
    res.render('index')
})

//get login info from flask side
app.post('/login', async function (req, res) {
    var options = {
        method: 'GET',
        uri: 'http://127.0.0.1:5000/',
        body:req.body,
        json: true // Automatically stringifies the body to JSON
    };
    //console.log(req.body)

    var returndata;
    var recieverequest = await request(options)
    .then(function (parsedBody) {
        //console.log(parsedBody.user_info); // parsedBody contains the data sent back from the Flask server
        returndata = parsedBody.user_info; // do something with this data, here I'm assigning it to a variable.
    })
    .catch(function (err) {
        console.log(err);
    });
    
    if(returndata) {
        //console.log(returndata)
        res.render('select',returndata)

    } else{
        res.render('index',{message:"Try again!"})

    }
   
});

//get registration from flask back
app.post('/register', async function (req, res) {
    var options = {
        method: 'POST',
        uri: 'http://127.0.0.1:5000/registration',
        body:req.body,
        json: true // Automatically stringifies the body to JSON
    };

    console.log(req.body)

    var returndata;
    var recieverequest = await request(options)
    .then(function (parsedBody) {
        //console.log(parsedBody.status); // parsedBody contains the data sent back from the Flask server
        returndata = parsedBody.status; // do something with this data, here I'm assigning it to a variable.
    })
    .catch(function (err) {
        console.log(err);
    });

    if(returndata) {
        //console.log(returndata);
        var userdata = req.body
        res.render('index');

    } else{
        res.send("Try again!!");

    };
});



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

    const gameList = { game1: { 
                            name: 'Zombie-Dice',
                            img: 'dice.png',
                            pk: '1'
                        },
                        game2: {
                            name: 'Tic-Tac-Toe',
                            img: 'tictactoe.png',
                            pk: '2'
                        }
                    }
    res.render('select', { gameList: gameList })
})

app.get('/start-new', (req, res)=>{

    // User initiates a new room and enters user's to connect

    const players = ['player1', 'player2', 'player3']
    res.render('start_new', { playerList: players }); 
})

app.get('/continue', (req, res)=>{

    // Continue games from a saved state

    const saveStates = [ { game_pk: "1", 
                           playthrough_id: "uniqueID", 
                           game_state: "gameState",
                           participant_pk: "2",
                           turn_order: "2",
                           turn_number: "4",
                           last_move: "11232141"  },
                         { game_pk: "1", 
                           playthrough_id: "uniqueID2", 
                           game_state: "gameState",
                           participant_pk: "2",
                           turn_order: "2",
                           turn_number: "4",
                           last_move: "10922" }
                        ]

    const roomInfo = { invite1: {
                            invitingUser: 'chase', 
                            gamename: 'tictactoe',
                            gameID: '12bgjd',
                        },
                        invite2: {
                            invitingUser: 'henry', 
                            gamename: 'zombiedice',
                            gameID: '24dwdad'
                        }
                    }

    res.render('continue', { saveStates: saveStates, roomInfo: roomInfo  });
})

app.get('/game', (req, res)=>{

    res.render('game');
})

app.post('/start-new', (req, res)=>{
    var usernames = body.req
    console.log(usernames)
})

app.post('/select', (req, res)=>{

    console.log(req.body)

})

app.post('/continue', (req, res)=>{
    var states = req.body
    console.log(states)
})


app.get('/games', (req, res) =>{
    res.send(games);
})


// //Create Socket for Chat Connection
// io.on('connection', (socket)=>{
//     socket.on('chat', (msg)=>{
//         io.emit('chat', msg)
//     })
// })

// io.on('disconnect', function(){
//     console.log('User Disconnected')
// })

app.use(express.static('public'))

//PORT
const port = process.env.PORT || 3001;
http.listen(port, ()=>{
    console.log(`listening to port: ${port}`)
})