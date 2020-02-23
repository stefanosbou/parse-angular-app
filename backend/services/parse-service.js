const Parse = require('parse/node');

const APP_ID = process.env.APP_ID || '';
const JAVASCRIPT_KEY = process.env.JS_KEY || '';

Parse.initialize(APP_ID, JAVASCRIPT_KEY);

Parse.serverURL = process.env.SERVER_URL || 'http://localhost:1337/parse';

module.exports = Parse;
