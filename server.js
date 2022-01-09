const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = 3000;
server.listen(PORT);
console.log(`Listening on port ${PORT}...`);

let readPlayerCount = 0;

io.on('connection', (socket) => {
  console.log('Connected', socket.id);

  socket.on('ready', () => {
    console.log('Player ready', socket.id);

    readPlayerCount++;

    if (readPlayerCount === 2) {
      io.emit('startGame', socket.id);
    }
  });

  socket.on('paddleMove', (paddleData) => {
    socket.broadcast.emit('paddleMove', (paddleData));
  });
});

