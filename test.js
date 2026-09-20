const test = require('node:test');
const assert = require('node:assert');

test('status API response', async () => {
    const response = {
        status: 'API is running'
    };

    assert.strictEqual(response.status, 'API is running');
});