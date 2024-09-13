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

const convertToISODate = (dateString) => {
  console.log(dateString);
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};

function adjustToVietnamTime(date) {
  const vietnamOffset = 7 * 60; // 7 giờ chuyển đổi thành phút
  const utcOffset = date.getTimezoneOffset(); // Phút lệch UTC của thời gian hiện tại
  return new Date(date.getTime() + (vietnamOffset - utcOffset) * 60 * 1000);
}

const generateRamdonNumber = () => {
  const ramdonNumber = Math.floor(10000 + Math.random() * 90000);
  return ramdonNumber.toString().padStart(5, "0");
};

const getDayofMonth = (month, year) => {
  const formattedMonth = String(month).padStart(2, "0");
  const nextMonth = month === 12 ? 1 : month + 1;
  const formattedNextMonth = String(nextMonth).padStart(2, "0");

  // Ngày đầu tháng hiện tại
  const startDate = new Date(`${year}-${formattedMonth}-01T00:00:00.000Z`);

  // Ngày đầu tháng tiếp theo
  const endDate = new Date(`${year}-${formattedNextMonth}-01T00:00:00.000Z`);

  return { startDate, endDate };
};
module.exports = {
  unSelectedObject,
  formatDate,
  convertToISODate,
  adjustToVietnamTime,
  getDayofMonth,
  generateRamdonNumber,
};
