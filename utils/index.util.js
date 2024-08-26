const _ = require("lodash");

const unSelectedObject = (obj, filedsToRemove) => {
  return _.omit(obj, filedsToRemove);
};

module.exports = {
  unSelectedObject,
};
