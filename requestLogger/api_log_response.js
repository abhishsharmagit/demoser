const db = require('../db/db_shim');

const APILogResponse = {
    /**
     * API response log details
     * @param {Object} apiDetails
     * @param {String} apiDetails.reqUniqueID - HTTP server auto generated alpha-numeric ID
     * @param {String} apiDetails.APIEndTime - HTTP Request end time
     * @param {Object} apiDetails.resBody - HTTP Response body
     * @param {Number} apiDetails.reqTotalTime - HTTP Request to Response total time
     * 
     */
    addAPILogResponse: function (apiDetails) {
        return new Promise(async (resolve, reject) => {
            const {
                reqUniqueID,
                APIEndTime,
                resBody,
                reqTotalTime
            } = apiDetails;
            const query = db.format( `
            INSERT
            INTO
            tbl_api_log_response
            SET
            req_unique_id = ?,
            api_end_time = ?,
            res_data = ?,
            req_total_time = ?
            `,
                [
                    reqUniqueID,
                    APIEndTime,
                    resBody,
                    reqTotalTime
                ]);
            db.query(query)
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }
};

module.exports = APILogResponse;
