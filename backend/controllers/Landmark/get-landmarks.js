const ParseService = require('../../services/parse-service');

module.exports = function (req) {
    const token = (req.token) ? {sessionToken: req.token} : {};

    return new Promise(async (resolve, reject) => {
        try {
            const Landmark = ParseService.Object.extend("Landmarks");
            const query = new ParseService.Query(Landmark);
            query.select("_id", "title", "short_info", "url", "photo", "photo_thumb");
            query.ascending("order");
            const landmarksList = await query.find(token);
            resolve(landmarksList);
        } catch (error) {
            reject(error);
        }
    });
};