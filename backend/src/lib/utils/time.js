export const toWIB = (date) => {
  if (!date) return null;

  const wib = new Date(date.getTime() + 7 * 60 * 60 * 1000);

  return wib.toISOString().slice(11, 16); // "HH:mm"
};
