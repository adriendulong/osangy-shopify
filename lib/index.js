import express from 'express';
import crypto from 'crypto';
import _ from 'lodash';
require('dotenv').config();

const app = express();


const { API_KEY, API_SECRET, APP_URL } = process.env;
let tokens = {};

/*
* Validate Hmac for Oauth
*/

function validateHmac(req, res, next) {
  const { hmac } = req.query;
  const paramsFiltered = _.pickBy(req.query, (value, key) => {
    if (key !== 'hmac' && key !== 'signature') return true;
    return false;
  });

  const keys = _.keys(paramsFiltered);
  keys.sort();

  let paramsString;
  keys.forEach((key) => {
    if (!paramsString) paramsString = `${key}=${paramsFiltered[key]}`;
    else paramsString += `&${key}=${paramsFiltered[key]}`;
  });

  const digest = crypto.createHmac('sha256', API_SECRET).update(paramsString).digest('hex');
  if (hmac !== digest) res.status(403).send(`Authentication failed. Digest provided was: ${digest}`);
  else next();
}

// ROUTES

app.get('/', (req, res) => {
  res.send('Hello World!');
});


/*
* Redirect the user to the Shopify install page
*/

app.get('/osangy/install', (req, res) => {
  const { shop } = req.query;
  const scopes = 'read_orders,read_products';
  const installUrl = `http://${shop}/admin/oauth/authorize?client_id=${API_KEY}&scope=${scopes}&redirect_uri=https://${APP_URL}/osangy/auth`;

  res.redirect(installUrl);
});


/*
* Auth page where the user is redirected once he authorized the app
*/
app.use('/osangy/auth', validateHmac);
app.get('/osangy/auth', (req, res) => {
  // const { shop, code, hmac } = req.params;

  res.send('ok');
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
