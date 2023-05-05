const sql = require('./database/sql');
const backend = require('./backend/backendIntf');
const http = require('http');

const hostname = '192.168.0.6';
const port = 8000;

const server = http.createServer(async(req, res) => {
    if(req.url.startsWith('/ping')){
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });
        res.write(`Ping received on ${new Date()}`);
        res.end();
    }else if(req.url.startsWith('/getQuestions')){
        // const url = new URL(req.url, `http://${req.headers.host}`);
        // const arg = url.searchParams.get('arg');

        const qRes = await sql.getQuestions();
        const obj = {
            result: qRes
        };
        console.log(`[INFO] Sending response: ${JSON.stringify(obj)}`);
        
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.write(JSON.stringify(obj));
        res.end();
    }else if(req.url.startsWith('/ask')){
        const url = new URL(req.url, `http://${req.headers.host}`);
        const query = url.searchParams.get('q');
        const historyId = url.searchParams.get('hid');
        const algorithm = url.searchParams.get('alg');
        const uwuifyLevel = url.searchParams.get('uwu');

        const config = new backend.UserQueryConfig();
        config.algorithm = algorithm;
        config.uwuifyLevel = parseInt(uwuifyLevel);
        if(historyId !== null)config.historyId = parseInt(historyId);

        const qRes = await backend.acceptUserQuery(query, config);
        // const obj = {
        //     result: qRes
        // };
        console.log(`[INFO] Sending response: ${JSON.stringify(qRes)}`);
        
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.write(JSON.stringify(qRes));
        res.end();
    }else{
        res.writeHead(404, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });
        res.write('Not found');
        res.end();
    }
});

server.listen(port, hostname, async() => {
    console.log(`[INFO] Server running at http://${hostname}:${port}/`);
    // backend.init();
});

server.on('close', () => {
    backend.end();
});
