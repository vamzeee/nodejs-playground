const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Is champ OP?</title></head>');
        res.write('<body><form action = "/check" method ="POST"><input type = "text" name = "champName"><button type = "submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    //redirecting back after storing data
    if (url === '/check' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My first page</title></head>');
        res.write('<body><h1>Hello from Node.js server!</h1></body>');
        res.write('</html>');
    }

})
server.listen(3000);