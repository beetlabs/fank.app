import { Server } from 'http';
import socket from 'socket.io';

import sockets from '../sockets';

export default function (app) {
  const server = Server(app);
  const io = socket(server);

  sockets(io, app.get('db'));

  app.get('/health', (_, response) => {
    response.send('🤙🏼');
  });

  server.listen(process.env.PORT, function () {
    console.log(`[READY]: ${this.address().port}`);
  });

  return Promise.resolve(app);
}

/**
 * io.on('connection', (socket) => {
 *  console.log(`${socket.id} has connected from ${socket.handshake.address})
 *
 *  socket.on('join game', (data) => {
 *    //what room? auth, etc. if all good
 *
 *    socket.join(sessionId)
 *    io.in(sessionId).emit('transaction', {type: 'join', playerName, timestamp})
 *  })
 *  socket.on('pay player', (data) => {
 *    // do something, hit database, calculate stuff
 *
 *    io.to(data.id).emit('player paid', {})
 *  })
 * })
 */
