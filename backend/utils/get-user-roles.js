const Parse = require('../services/parse-service');

module.exports = async (user_id) => {
    const userQuery = new Parse.Query(Parse.User);
    const user = await userQuery.get(user_id);
    const rolesQuery = new Parse.Query(Parse.Role);
    rolesQuery.equalTo('users', user);
    return await rolesQuery.find();
};
