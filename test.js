const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

const child = spawn('node', ['index.js']);
test('responds to requests', (t) => {
  t.plan(2);
  child.stdout.on('data', () => {
    request('http://127.0.0.1:5000', (error, response, body) => {
      child.kill();
      t.false(error);
      t.equal(response.statusCode, 200);
      // t.notEqual(body.indexOf('Hello World'), -1);
    });
  });
});
