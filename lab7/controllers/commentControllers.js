// controllers/commentControllers.js
import { TemplateEngine } from '../TemplateEngine.js';
import { readComments, getLimitComments, addComment } from '../services/dbService.js';
import querystring from 'querystring';

// const getLastCommentHandler = async (req, res) => {
//     try {
//         const lastComment = await getLastComment();
//         const template = '<html><body><h1>Last Comment</h1><p>Name: {{ name }}</p><p>Comment: {{ comment }}</p><p>Time: {{ time }}</p></body></html>';
//         const compiled = TemplateEngine.compile(template, lastComment);
//         res.writeHead(200, {
//             'Content-Type': 'text/html',
//             'Content-Length': compiled.biteLength
//         });
//         res.end(compiled.html);
//     } catch (error) {
//         res.writeHead(500, { 'Content-Type': 'text/plain' });
//         res.end('Internal Server Error');
//     }
// };
const comments = [];

const getLastComment = (req, res) => {
    const lastComment = comments.length > 0 ? comments[comments.length - 1] : { name: 'gosha', comment: 'fsfsfsdfsdfdsffs' };
    const template = '<html><body><h1>Last Comment</h1><p>Name: {{ name }}</p><p>Comment: {{ comment }}</p></body></html>';
    const compiled = TemplateEngine.compile(template, lastComment);
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': compiled.biteLength
    });
    res.end(compiled.html);
};

const getCommentsController = async (req, res) => {
    const { page = 1, limit = 10 } = Object.fromEntries(req.query.entries());

    const offset = (page - 1) * limit;

    try {
        const rows = await readComments(Number(limit), Number(offset));
        const totalComments = await getLimitComments();
        const totalPages = Math.ceil(totalComments / limit);

        const comments = rows.map(row => ({
            id: row.id,
            comment: row.comment,
            name: row.name,
            time: row.time_added
        }));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ page: Number(page), limit: Number(limit), totalPages, comments }));
    } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
    }
};

const postComment = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            if (!data.name || !data.comment) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Missing required keys: name and comment');
                return;
            }
            const newComment = await addComment(data.name, data.comment);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newComment));
        } catch (error) {
            console.error(error);
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end(error.message);
        }
    });
};


export { getLastComment, getCommentsController as getComments, postComment };