const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const backendDir = path.join(__dirname, 'backend');

exec('npm start', { cwd: backendDir }, (error, stdout, stderr) => {
    fs.writeFileSync('npm_start_error.txt', error ? error.toString() : 'no error');
    fs.writeFileSync('npm_start_stdout.txt', stdout || 'no stdout');
    fs.writeFileSync('npm_start_stderr.txt', stderr || 'no stderr');
});
