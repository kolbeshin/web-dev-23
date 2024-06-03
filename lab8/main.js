import { VanillaApp } from './VanillaApp.js';
import { initDB } from './services/dbService.js';
import { getCommentsController, getCommentController, postCommentController, patchCommentController, deleteCommentController } from './controllers/commentControllers.js';

const app = new VanillaApp();

app.add('GET', '/comments', getCommentsController);
app.add('GET', '/comments/:id', getCommentController);
app.add('POST', '/comments', postCommentController);
app.add('PATCH', '/comments/:id', patchCommentController);
app.add('DELETE', '/comments/:id', deleteCommentController);

app.listen(8000, 'localhost', async () => {
    await initDB();
    console.log('Server is running on http://localhost:8000');
});
