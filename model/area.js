
var db = require("../db/db_shim");
const logger = require('../utils/logger').getLogger("model/area.js");

// model for calculate area

const areas = {
    areaSquare: function(area, shape) {
        return new Promise((resolve, reject) => {
            const areaQuery = db.format(
              `INSERT INTO tbl_area (area, shape)
          VALUES (?, ?)`,
        [area, shape]
            );
            logger.debug("areaQuery", areaQuery);
            
            db.query(areaQuery, true)
              .then((result) => {
                return resolve(result);
              })
              .catch((error) => {
                logger.error(error);
                return reject(error);
              });
            });
        },

        areaRect: function(area, shape) {
            return new Promise((resolve, reject) => {
                const areaQuery = db.format(
                  `INSERT INTO tbl_area (area, shape)
              VALUES (?, ?)`,
            [area, shape]
                );
                logger.debug("areaQuery", areaQuery);
                db.query(areaQuery, true)
                  .then((result) => {
                    return resolve(result);
                  })
                  .catch((error) => {
                    logger.error(error);
                    return reject(error);
                  });
                });
            },
            
            areaCircle: function(area, shape) {
              return new Promise((resolve, reject) => {
                  const areaQuery = db.format(
                    `INSERT INTO tbl_area (area, shape)
                VALUES (?, ?)`,
              [area, shape]
                  );
                  logger.debug("areaQuery", areaQuery);
                  db.query(areaQuery, true)
                    .then((result) => {
                      return resolve(result);
                    })
                    .catch((error) => {
                      logger.error(error);
                      return reject(error);
                    });
                  });
              },

              areaTri: function(area, shape) {
                return new Promise((resolve, reject) => {
                    const areaQuery = db.format(
                      `INSERT INTO tbl_area (area, shape)
                  VALUES (?, ?)`,
                [area, shape]
                    );
                    logger.debug("areaQuery", areaQuery);
                    db.query(areaQuery, true)
                      .then((result) => {
                        return resolve(result);
                      })
                      .catch((error) => {
                        logger.error(error);
                        return reject(error);
                      });
                    });
                },
                
                getArea: function(skip, limit) {
                  return new Promise((resolve, reject) => {
                    let paginationCondition = ``;

                  if ((typeof skip != "undefined") && (typeof limit != "undefined")) {
                  paginationCondition = db.format(`LIMIT ?, ?`, [skip, limit]);
                   }
                   
                      const areaQuery = db.format(
                        `SELECT * FROM tbl_area ORDER BY tbl_area.id ${paginationCondition}`,
                  [skip, limit]
                      );
                      logger.debug("areaQuery", areaQuery);
                      db.query(areaQuery)
                        .then((result) => {
                          return resolve(result);
                        })
                        .catch((error) => {
                          logger.error(error);
                          return reject(error);
                        });
                      });
                  },
            
                
}

module.exports = areas;