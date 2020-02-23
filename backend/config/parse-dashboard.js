module.exports = {
    "apps": [
        {
            "serverURL": process.env.SERVER_URL || 'http://localhost:1337/parse',
            "appId": process.env.APP_ID || '',
            "masterKey": process.env.MASTER_KEY || '',
            "appName": process.env.APP_NAME || '',
            "javascriptKey": process.env.JS_KEY || '',
            "restKey": process.env.REST_KEY || ''
        }
    ],
    "users": [
        {
            "user": process.env.DASHBOARD_USER || 'admin',
            "pass": process.env.DASHBOARD_PW || 'admin'
        }
    ]
}
