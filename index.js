const  express = require('express');
const http = require('http')
const app = express();
const port = process.env.PORT  || 3000;
const path=require('path');
const dpath = path.join(__dirname ,'/src/public')
const server =http.createServer(app)
const socketio =require('socket.io')
const io= socketio(server)
const {genratemsg} = require('./src/public/functions/mesgs.js')
const {adduser , removeuser  , getUser , getUsersInRoom} = require('./src/public/functions/users.js')
app.use(express.static(dpath))

const val ='Welcome to Our chat App';



io.on('connection', (socket)=>{
    io.emit('MessageRec', genratemsg(val));
    socket.on('join',(data,callback)=>{
       
        const usrs =  adduser(socket.id,data.username,data.roomno)
       
        if(usrs.error)
        {
           callback(usrs.error)
        }

        socket.join(usrs.users[0].roomnor)
        socket.broadcast.to(usrs.users[0].roomnor).emit('MessageRec',genratemsg(`${usrs.users[0].usernamer} has  joined`));
       
        callback()
    })
   
    socket.on('MessageSent',(vala,callback)=>{
        const user  =  getUser(socket.id);
       io.to(user.roomnor).emit('MessageRec',genratemsg(vala));
       callback()
    }
);
socket.on('sendloc',(values,callback)=>{
    const user  =  getUser(socket.id);
    io.to(user.roomnor).emit('LocationRec',genratemsg(`www.google.com/maps?q=${values.lat},${values.long}`));
    callback()
});
socket.on('disconnect',()=>{
    const userrr = removeuser(socket.id)
    if(userrr){
        socket.to(userrr.roomnor).emit('MessageRec',genratemsg(`${userrr.usernamer} has left`));
    }

});
});



//app.get('/', (req, res)=>{});

server.listen(port, () => console.log(`port on at ${port}`));
