const server = require('./server.js');

//listen
const PORT = 9000;
server.listen(PORT,() => {
    console.log(`LISTENING ON PORT ${PORT}`);
});

