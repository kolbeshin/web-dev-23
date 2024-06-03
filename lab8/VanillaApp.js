import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

class VanillaApp {
    constructor() {
        this.server = http.createServer(this.handleRequest.bind(this));
        this.routes = new Map();
        this.staticFiles = {};
    }

    handleRequest(req, res) {
        const method = req.method;
        const parsedUrl = url.parse(req.url);
        const pathName = parsedUrl.pathname;

        if (this.staticFiles[pathName]) {
            const file = this.staticFiles[pathName];
            res.writeHead(200, {
                'Content-Type': file.contentType,
                'Content-Length': file.length
            });
            res.end(file.content);
            return;
        }

        for (const [route, handler] of this.routes.entries()) {
            const [routeMethod, routePath] = route.split(' ');

            if (method === routeMethod) {
                const routeRegex = new RegExp(`^${routePath.replace(/:[^\s/]+/g, '([\\w-]+)')}$`);
                const match = pathName.match(routeRegex);

                if (match) {
                    req.params = {};
                    const paramNames = (routePath.match(/:[^\s/]+/g) || []).map(param => param.substring(1));
                    paramNames.forEach((param, index) => {
                        req.params[param] = match[index + 1];
                    });
                    req.query = new URLSearchParams(parsedUrl.query);
                    handler(req, res);
                    return;
                }
            }
        }

        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('400 Bad Request');
    }

    add(method, url, handler) {
        this.routes.set(`${method} ${url}`, handler);
    }

    listen(port, host, callback) {
        this.server.listen(port, host, callback);
    }

    static(dir) {
        this.staticFiles = this.readFiles(dir);
    }

    readFiles(dir) {
        const files = {};
        fs.readdirSync(dir).forEach(file => {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);
            if (stats.isFile()) {
                const content = fs.readFileSync(filePath, 'utf-8');
                const contentType = path.extname(filePath) === '.html' ? 'text/html' : 'text/css';
                files[path.join('/', file)] = {
                    content,
                    length: Buffer.byteLength(content),
                    contentType
                };
            }
        });
        return files;
    }
}

export { VanillaApp };
