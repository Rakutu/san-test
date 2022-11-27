export const dateFormatter = (date) => {
  const fullDate = new Date(date);
  const year = fullDate.getFullYear();

  const month = fullDate.getMonth();
  const validMonth = month > 8
    ? month + 1
    : `0${month}`;

  const day = fullDate.getDate();
  const validDay = day > 9
    ? day
    : `0${day}`;

  return `${validDay}.${validMonth}.${year}`
}

export const yearFormatter = new Intl.NumberFormat('ru', {
  style: 'unit',
  unit: 'year',
  unitDisplay: 'long',
})