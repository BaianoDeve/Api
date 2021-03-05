const http = require('http');
const app = require('./src/app')
const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(port);
console.log('A API está rodando na porta ' + port);

