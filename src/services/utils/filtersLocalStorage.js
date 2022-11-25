const FILTERS_KEY = 'filters';

export const setFiltersToLs = (filter) => {
  localStorage.setItem(FILTERS_KEY, JSON.stringify(filter));
};

export const getFiltersFromLs = () => {
  try {
    const filter = localStorage.getItem(FILTERS_KEY);

    return filter
      ? JSON.parse(filter)
      : undefined;
  } catch (error) {

    throw error;
  }
};