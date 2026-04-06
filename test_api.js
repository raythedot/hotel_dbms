const http = require('http');
const fs = require('fs');

http.get('http://localhost:5001/api/rooms', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        fs.writeFileSync('api_test_result.txt', `STATUS: ${res.statusCode}\n\n${data}`);
    });
}).on('error', (err) => {
    fs.writeFileSync('api_test_result.txt', `ERROR: ${err.message}`);
});
