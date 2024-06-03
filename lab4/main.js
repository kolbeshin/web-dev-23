import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

let stats = {};

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

let comments = [];

const readFiles = (dir) => {
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
};

const publicDir = path.join("/Users/senyashago/prog/web/JS class/web-dev-23-SenyashaGo/lab4/", 'public');
const templatesDir = path.join("/Users/senyashago/prog/web/JS class/web-dev-23-SenyashaGo/lab4/", 'templates');

const publicFiles = readFiles(publicDir);
const templateFiles = readFiles(templatesDir);

const server = http.createServer((req, res) => {
    const url = req.url === '/' ? '/index.html' : req.url;

    // Обработка статических файлов
    if (publicFiles[url]) {
        const file = publicFiles[url];
        res.writeHead(200, {
            'Content-Type': file.contentType,
            'Content-Length': file.length
        });
        res.end(file.content);
        return;
    }

    if (url === '/lastcomment.html') {
        const lastComment = comments.length > 0 ? comments[comments.length - 1] : { name: '', comment: '' };
        const templateFile = templateFiles['/lastcomment.html'];
        let content = templateFile.content.replace(/{{\s*name\s*}}/g, escapeHtml(lastComment.name));
        content = content.replace(/{{\s*comment\s*}}/g, escapeHtml(lastComment.comment));
        res.writeHead(200, {
            'Content-Type': templateFile.contentType,
            'Content-Length': Buffer.byteLength(content)
        });
        res.end(content);
        return;
    }

    if (req.method === 'GET' && url === '/stats') {
        let html = `
            <html lang="en">
            <head>
                <title>Статистика запросов</title>
            </head>
            <body>
                <h1>Статистика запросов</h1>
                <table>
                    <tr>
                        <th>User-Agent</th>
                        <th>Количество запросов</th>
                    </tr>
        `;
        for (const userAgent in stats) {
            html += `
                <tr>
                    <td>${userAgent}</td>
                    <td>${stats[userAgent]}</td>
                </tr>
            `;
        }
        html += `
                </table>
            </body>
            </html>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
        return;
    }

    if (req.method === 'POST' && url === '/comments') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                if (!data.name || !data.comment) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Отсутствуют обязательные ключи name и comment');
                    return;
                }
                comments.push({ name: data.name, comment: data.comment });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(comments));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end(error.message);
            }
        });
        return;
    }

    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('400 Bad Request');
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

server.on('connection', () => {
    console.log('Новое подключение установлено');
});

server.on('error', (error) => {
    console.error('Ошибка сервера:', error.message);
});

// Обновление статистики запросов
server.on('request', (req) => {
    const userAgent = req.headers['user-agent'];
    stats[userAgent] = (stats[userAgent] || 0) + 1;
});


