const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
    console.log('DATABASE_URI not specified, falling back to localhost.');
}

module.exports = {
    databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
    appId: process.env.APP_ID || '',
    masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
    serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
    javascriptKey: process.env.JS_KEY || '',
    restKey: process.env.REST_KEY || ''
}
