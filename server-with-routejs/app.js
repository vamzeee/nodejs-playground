const http = require('http');
const routes = require('./routes');
// console.log(routes.someText); (routes is an object here, not just the function)
const server = http.createServer(routes);
//const server = http.createServer(routes.handler);

server.listen(3000);