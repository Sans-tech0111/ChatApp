// node server
 const io = require('socket.io')(8000)

 const users = {};

 io.on('connection', socket =>{
    socket.on('new-user-joined', n =>{
        users[socket.id] = n;
        socket.broadcast.emit('user-joined', n);
    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });
 })
