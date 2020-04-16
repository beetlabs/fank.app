export default function (io) {
  io.on('connection', (socket) => {
    console.log(`${socket.id} has connected from ${socket.handshake.address}`);

    socket.on('join session', (data) => {
      socket.join(data.sessionId);
      /**
       * @todo
       * - create session if not exists || get session
       * - update DB with transaction
       * - pull list of transactions
       * - emit transaction to everyone in session
       * - emit all transactions and current players to this player
       */
      const sender_id = 'moaf';
      const timestamp = new Date().toString();
      io.in(data.sessionId).emit('transaction', {
        type: 'join',
        sender_id,
        timestamp,
      });

      const transactions = [
        {
          sender_id: 'dandyg',
          transaction_type: 'join',
          timestamp: new Date().toString(),
        },
      ];
      const players = ['dandyg', 'moaf'];
      socket.emit('joined session', {
        transactions,
        players,
      });
    });

    socket.on('leave session', (data) => {
      io.in(data.sessionId).emit('transaction', {
        type: 'leave',
        sender_id: 'moaf',
        timestamp: new Date().toString(),
      });

      socket.leave(data.sessionId);
    });
  });
}
