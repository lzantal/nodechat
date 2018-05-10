const expect = require('expect');
const {generateMsg} = require('./message');

describe('generateMsg', () => {
    it('should generate correct message object', () => {
        let from = 'Laszlo';
        let text = 'Running test on generateMsg';
        let res = generateMsg(from, text);
        expect(res).toInclude({from, text});
        expect(res.createdAt).toBeA('number');
    })
});
