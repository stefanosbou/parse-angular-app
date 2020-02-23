const getUserRoles = require('./get-user-roles');

module.exports = async (parse_obj, user_id) => {
    if (!user_id) {
        return parse_obj.getACL().getPublicWriteAccess();
    }

    const publicWrite = parse_obj.getACL().getPublicWriteAccess();
    const userWrite = parse_obj.getACL().getWriteAccess(user_id);

    const roles = await getUserRoles(user_id);
    let roleWrite = false;

    for (let i = 0; i < roles.length; i++) {
        if (parse_obj.getACL().getRoleWriteAccess(roles[i])) {
            roleWrite = true;
            break;
        }
    }

    return publicWrite || userWrite || roleWrite;
};
