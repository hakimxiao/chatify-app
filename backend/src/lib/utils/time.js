export const toWIB = (date) => {
  if (!date) return null;
  return new Date(date.getTime() + 7 * 60 * 60 * 1000);
};
