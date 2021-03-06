/**
 * Created by TCBORKUN on 12.09.2015.
 */
module.exports = function(io, rooms){
    var chatrooms = io.of('/roomlist').on('connection', function(socket){
        console.log('Connection Establised on the Server !');
        socket.emit('roomupdate', JSON.stringify(rooms));

        socket.on('newroom',function(data){
            rooms.push(data);
            socket.broadcast.emit('roomupdate',JSON.stringify(rooms));
            socket.emit('roomupdate', JSON.stringify(rooms));
        })
    })

    var messages = io.of('/messages').on('connection', function(socket){
        console.log('Connected to the Chatroom !');

        socket.on('joinroom', function (data) {
            socket.username = data.user;
            socket.userPic = data.userPic;
            socket.join(data.room);
            updateUserList(data.room, true);
        })

        socket.on('newMessage', function(data){
            socket.broadcast.to(data.room_number).emit('messagefeed', JSON.stringify(data));
        })

        function updateUserList(room, updateAll){
            var getUsers = io.of('/messages').clients(room);   //for socket.io 0.x
            //var getUsers = getUsersFromRoom(room);   //for socket.io 1.x
            var userlist = [];

            for(var i in getUsers) {
                userlist.push({user:getUsers[i].username,userPic:getUsers[i].userPic});
            }
            socket.to(room).emit('updateUsersList', JSON.stringify(userlist));

            if(updateAll) {
                socket.broadcast.to(room).emit('updateUsersList', JSON.stringify(userlist));
            }
        }

        socket.on('updateList', function(data){
            updateUserList(data.room);
        })

        //for socket.io 1.x
        /*  --bu eski versiyonda sorun oluyor
        function getUsersFromRoom(room){
            var userArray = [];
            var nsp = io.of('/messages');
            var clientsInRoom = nsp.adapter.rooms[room];
            for(var client in clientsInRoom) {
                userArray.push(nsp.connected[client]);
            }
            return userArray;
        } */

    })
}
