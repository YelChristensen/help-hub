const he = require("he");

const decodeHtmlEntities = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = he.decode(req.body[key]);
      }
    }
  }
  next();
};

module.exports = decodeHtmlEntities;
