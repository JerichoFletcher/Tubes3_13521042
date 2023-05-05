const http = require('http');
const options = {
    hostname: '192.168.0.6',
    port: 8000,
    // path: '/getQuestions',
    method: 'GET'
};

/**
 * Create a new request.
 * @param {string} path 
 * @param {(data: string) => void} callback 
 */
export function request(path, callback){
    const opt = options;
    opt.path = path;
    const req = http.request(options, res => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => callback(data));
    });

    req.on('error', e => {
        console.error(e);
    });
    
    return req;
}
