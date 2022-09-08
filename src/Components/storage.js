const getItemsFromStorage = (items) => {
  if (localStorage.getItem(items)) {
    return JSON.parse(localStorage.getItem(items));
  }
  return [];
};
export default getItemsFromStorage;
