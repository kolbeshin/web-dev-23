const rootGetController = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('root route');
};

const rootPostController = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Post request received', body: JSON.parse(body) }));
    });
};

export { rootGetController, rootPostController };