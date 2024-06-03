import { readComments, getLimitComments, addComment, getCommentById, updateComment, deleteComment } from '../services/dbService.js';

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

const getCommentController = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await getCommentById(id);
        if (comment) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(comment));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Comment not found');
        }
    } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
    }
};

const postCommentController = async (req, res) => {
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

const patchCommentController = async (req, res) => {
    const { id } = req.params;
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            if (!data.comment) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Missing required key: comment');
                return;
            }
            const updatedComment = await updateComment(id, data.comment);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedComment));
        } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
        }
    });
};

const deleteCommentController = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteComment(id);
        res.writeHead(204);
        res.end();
    } catch (error) {
        console.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
    }
};

export { getCommentsController, getCommentController, postCommentController, patchCommentController, deleteCommentController };
