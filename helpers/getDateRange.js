function getDateRange(type, value) {
  const year = new Date().getFullYear(); // Năm hiện tại
  const month = new Date().getMonth(); // Tháng hiện tại (0-indexed)

  let startDate, endDate;

  switch (type) {
    case "day":
      // Khoảng thời gian cho một ngày cụ thể
      startDate = new Date(value); // value phải là ngày theo định dạng ISO (yyyy-mm-dd)
      endDate = new Date(value);
      endDate.setHours(23, 59, 59, 999); // Cuối ngày
      break;

    case "week":
      // Khoảng thời gian cho một tuần cụ thể
      const firstDayOfWeek = new Date(year, 0, 1); // Ngày đầu năm
      const dayOfWeek = firstDayOfWeek.getDay();
      const startOfWeek = new Date(
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() + value * 7 - dayOfWeek)
      );
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999); // Cuối tuần
      startDate = startOfWeek;
      endDate = endOfWeek;
      break;

    case "month":
      // Khoảng thời gian cho một tháng cụ thể
      startDate = new Date(year, value - 1, 1); // Tháng 1-indexed
      endDate = new Date(year, value, 0, 23, 59, 59, 999); // Ngày cuối của tháng
      break;

    case "quarter":
      // Khoảng thời gian cho một quý cụ thể
      const startMonthOfQuarter = (value - 1) * 3;
      startDate = new Date(year, startMonthOfQuarter, 1);
      endDate = new Date(year, startMonthOfQuarter + 3, 0, 23, 59, 59, 999); // Ngày cuối của quý
      break;

    case "year":
      // Khoảng thời gian cho một năm cụ thể
      startDate = new Date(value, 0, 1);
      endDate = new Date(value, 11, 31, 23, 59, 59, 999); // Cuối năm
      break;

    default:
      throw new Error(
        "Invalid type. Please specify day, week, month, quarter, or year."
      );
  }

  return {
    startDate,
    endDate,
  };
}

module.exports = {
  getDateRange,
};
