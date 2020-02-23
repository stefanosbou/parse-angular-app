const Parse = require('../../services/parse-service');
const hasWritePermission = require('../../utils/has-write-permission');
const imageProcessing = require('../../services/image-processing');

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

            if (!canWrite) {
                throw new Error('Unauthorized');
            }

            if (req.file) {
                const photo = await imageProcessing(req.file);
                landmark.set('photo', photo.original);
                landmark.set('photo_thumb', photo.thumbnail);
            }

            landmark.set('title', req.body.title);
            landmark.set('description', req.body.description);
            landmark.set('url', req.body.url);

            await landmark.save(null, token);

            resolve();
        } catch (error) {
            reject(error);
        }
    });
};