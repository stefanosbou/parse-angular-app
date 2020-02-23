const Parse = require('../../services/parse-service');
const hasWritePermission = require('../../utils/has-write-permission');

module.exports = function (req) {
    const token = (req.token) ? {sessionToken: req.token} : {};
    const landmark_id = req.params.landmark_id;
    const user_id = req.user_id;

    return new Promise(async (resolve, reject) => {
        try {
            const Landmark = Parse.Object.extend("Landmarks");
            const query = new Parse.Query(Landmark);
            const landmark = await query.get(landmark_id, token);

            const canWrite = await hasWritePermission(landmark, user_id);

            const json = landmark.toJSON();
            json.canWrite = canWrite;

            resolve(json);
        } catch (error) {
            reject(error);
        }
    });
};