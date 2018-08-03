var express = require('express');
var app = express();
//set port_1
var port  = process.env.PORT || 3000;
//create server
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var allUsers = [];
var users = [];
var connections = [];

//server
server.listen(port, function(){
    console.log('Server Running...');
});

/*server.close(function() {
    console.log('We closed!');
    process.exit();
});*/

app.get('/', function(req, res){
    //res.sendFile(__dirname + '/index.html');
    res.send('Chat Server works...');
    console.log('app running');
});

io.sockets.on('connection',function(socket){
    //update oline users
    function updateUsernames(){
        io.sockets.emit('get users', users);
    }
    connections.push(socket);
    //console.log('Connected: %s sockets connection', connections.length);

    //Disconnect
    socket.on('disconnect', function(data){
        users.splice(users.indexOf(socket.username), 1);
        connections.splice(connections.indexOf(socket),1);
        //console.log('Disconnected: %s sockets connection', connections.length);
        updateUsernames();
        if(connections.length === 0){
            allUsers = [];
            console.clear();
        }
    });

    //Manual Disconnect
    socket.on('exit', function(data){
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
    });    

    //send message
    socket.on('send message', function(message, username){
        if(users.indexOf(username)===-1){
            users.push(username);
            socket.username = username;
            updateUsernames();
        }
        io.sockets.emit('new message', {msg: message, user:username});
    });

    //New User
    socket.on('new user',function(userData, callback){
        //console.log(userData);
        var username = userData.name;
        var uuid = userData.uuid;
        if(users.indexOf(username)!==-1){
            callback(false);
            return;
        }
        callback(true);
        socket.username = username;
        users.push(username);
        allUsers.push(username);
        updateUsernames();
    });

    //Make socket alive alltime
    socket.on('client heart beat',function(pulse){
        //console.clear();
        //console.log(pulse, socket.username);
    });
});

//server pulse
var pulse = 0;
var timer = setInterval(function(){
    pulse++;
    io.sockets.emit('server heart beat', pulse);
},2000);