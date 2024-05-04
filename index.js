const http = require('http');
const fs = require('fs');
const { insertar, consultar, actualizar, eliminar } = require('./consultas');

http.createServer(async (req, res) => {
    if (req.url == '/' && req.method === 'GET') {
        res.setHeader('content-type', 'text/html');
        const html = fs.readFileSync('index.html', 'utf8');
        res.end(html);
    }

    if (req.url == '/cancion' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const cancion = Object.values(JSON.parse(body));
            const respuesta = await insertar(cancion);
            res.end(JSON.stringify(respuesta));
        });
    }

    if (req.url == '/canciones' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        const respuesta = await consultar();
        res.end(JSON.stringify(respuesta));
    }

    if (req.url.startsWith('/cancion') && req.method === 'PUT') {
        const id = req.url.split('?')[1].split('=')[1];
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const datos = Object.values(JSON.parse(body));
            const respuesta = await actualizar(id, datos);
            res.end(JSON.stringify(respuesta));
        });
    }

    if (req.url.startsWith('/cancion') && req.method === 'DELETE') {
        const id = req.url.split('?')[1].split('=')[1];
        const respuesta = await eliminar(id);
        res.end(JSON.stringify(respuesta));
    }

}).listen(3000);

console.log('Servidor funcionando en el puerto 3000');
