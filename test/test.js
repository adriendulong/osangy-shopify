/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: 0 */
import { expect } from 'chai';
import crypto from 'crypto';
import rp from 'request-promise';
require('dotenv').config();

const { API_SECRET, APP_URL } = process.env;

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', function () {
      expect([1, 2, 3].indexOf(4)).to.equal(-1);
    });
  });
});

describe('Security', () => {
  describe('Hmac Validation', () => {
    it('should be equal to hmac received', function (done) {
      const code = '0907a61c0c8d55e99db179b68161bc00';
      const shop = 'some-shop.myshopify.com';
      const timestamp = '1337178173';
      const hmacDigest = crypto.createHmac('sha256', API_SECRET).update('code=0907a61c0c8d55e99db179b68161bc00&shop=some-shop.myshopify.com&timestamp=1337178173').digest('hex');
      const requestUrl = `https://${APP_URL}/osangy/auth?hmac=${hmacDigest}&shop=${shop}&code=${code}&timestamp=${timestamp}`;

      rp(requestUrl).then(() => {
        done();
      }).catch(err => done(err));
    });
  });
});
