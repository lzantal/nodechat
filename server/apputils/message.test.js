const expect = require('expect');
const {generateMsg} = require('./message');

describe('generateMsg', () => {
    it('should generate correct message object', () => {
        let from = 'Laszlo';
        let text = 'Running test on generateMsg';
        let res = generateMsg(from, text);
        expect(res).toMatchObject({from, text});
        expect(typeof res.createdAt).toBe('number');
    });
});
