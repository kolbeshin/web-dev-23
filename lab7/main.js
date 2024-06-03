import { VanillaApp } from './VanillaApp.js';
import { rootGetController, rootPostController } from './controllers/rootControllers.js';
import { getLastComment, postComment, getComments } from './controllers/commentControllers.js';
import { initDB } from './services/dbService.js';

const PORT = 8000;
const HOST = '127.0.0.1';
const publicDir = './lab7/public';

const myServer = new VanillaApp();

myServer.static(publicDir);

myServer.add('GET', '/', rootGetController);
myServer.add('POST', '/', rootPostController);
myServer.add('GET', '/lastcomment.html', getLastComment);
myServer.add('POST', '/comments', postComment);
myServer.add('GET', '/comments', getComments);

initDB().then(() => {
    myServer.listen(PORT, HOST, () => {
        console.log(`Server is running on http://${HOST}:${PORT}`);
    });
}).catch(error => {
    console.error('Failed to initialize the database:', error);
});
