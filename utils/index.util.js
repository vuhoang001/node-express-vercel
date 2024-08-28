const _ = require("lodash");

const unSelectedObject = (obj, filedsToRemove) => {
  return _.omit(obj, filedsToRemove);
};

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

module.exports = {
  unSelectedObject,
  formatDate,
};
