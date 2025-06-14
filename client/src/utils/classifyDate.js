const classifyDate = (date) => {
  const now = new Date();
  const inputDate = new Date(date);

  // Check if same day
  const isToday =
    inputDate.getDate() === now.getDate() &&
    inputDate.getMonth() === now.getMonth() &&
    inputDate.getFullYear() === now.getFullYear();

  // Get start of week (Sunday)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);

  // Get end of week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const isThisWeek = inputDate >= startOfWeek && inputDate <= endOfWeek;

  // Check if same month and year
  const isThisMonth =
    inputDate.getMonth() === now.getMonth() &&
    inputDate.getFullYear() === now.getFullYear();

  return {
    isToday,
    isThisWeek,
    isThisMonth,
  };
};

export default classifyDate;