const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (pathname === '/') {
            fs.readFile(path.join(__dirname, 'calculator.html'), (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading calculator.html');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else if (pathname === '/calculate') {
            const num1 = parseFloat(parsedUrl.query.num1);
            const operator = parsedUrl.query.operator;
            const num2 = parseFloat(parsedUrl.query.num2);
            let result;

            switch (operator) {
                case 'add':
                    result = num1 + num2;
                    break;
                case 'subtract':
                    result = num1 - num2;
                    break;
                case 'multiply':
                    result = num1 * num2;
                    break;
                case 'divide':
                    result = num1 / num2;
                    break;
                default:
                    result = 'Invalid operator';
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ result }));
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
