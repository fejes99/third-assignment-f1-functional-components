export const getFormattedDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const driverDetailsHandler = (props, driverId, year) => {
  props.history.push(`/drivers/${driverId}?year=${year}`);
};

export const constructorDetailsHandler = (props, constructorId, year) => {
  props.history.push(`/constructors/${constructorId}?year=${year}`);
};

export const raceDetailsHandler = (props, raceId, year) => {
  props.history.push(`/races/${raceId}?year=${year}`);
};

export const sumPoints = (firstDriver, secondDriver) => {
  return Number(firstDriver) + Number(secondDriver);
};

export const searchFilter = (state) => {};
