const unirest = require('unirest');

const APP_ID = process.env.APP_ID || '';
const MASTER_KEY = process.env.MASTER_KEY || '';

module.exports = () => {
    return (req, res, next) => {
        if (req.header("x-parse-session-token")) {
            unirest.get('http://localhost:1337/parse' + '/users/me')
                .headers({
                    'X-Parse-Application-Id': APP_ID,
                    'X-Parse-Master-Key': MASTER_KEY,
                    'X-Parse-Session-Token': req.header("x-parse-session-token")
                })
                .send({})
                .then((response) => {
                    req.token = req.header("x-parse-session-token");
                    req.user_id = response.body.objectId;
                    next();
                }).catch((err) => {
                next();
            });
        } else {
            next();
        }
    }
}
