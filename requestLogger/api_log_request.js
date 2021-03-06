const db = require('../db/db_shim');

const APILogRequest = {
    /**
     * API request log details
     * @param {Object} apiDetails
     * @param {String} apiDetails.method - HTTP method
     * @param {String} apiDetails.url - HTTP URL
     * @param {Object} apiDetails.headers - HTTP HEADERS
     * @param {String} apiDetails.APIHitTime - HTTP Request Time
     * @param {Object} apiDetails.reqBody - HTTP Request body
     * @param {String} apiDetails.ip - HTTP Request IP
     * @param {String} apiDetails.reqUniqueID - HTTP server auto generated alpha-numeric ID
     */
    addAPILogRequest: function (apiDetails) {
        return new Promise(async (resolve, reject) => {
            const {
                method,
                url,
                headers,
                APIHitTime,
                reqBody,
                ip,
                reqUniqueID
            } = apiDetails;
            const query = db.format(`INSERT
                INTO
                tbl_api_log_request
                SET
                method = ?,
                url = ?,
                req_headers = ?,
                api_hit_time = ?,
                req_data = ?,
                ip = ?,
                req_unique_id = ?`,
                [
                    method,
                    url,
                    headers,
                    APIHitTime,
                    reqBody,
                    ip,
                    reqUniqueID
                ]);
            db.query(query)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }
};

module.exports = APILogRequest;
