/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: 0 */
import { expect } from 'chai';

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', function () {
      expect([1, 2, 3].indexOf(4)).to.equal(-1);
    });
  });
});
