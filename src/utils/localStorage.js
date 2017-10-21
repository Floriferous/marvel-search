export const storageAvailable = () => {
  try {
    const storage = window.localStorage;
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
};

export const saveValueAtKey = (key, value) => {
  if (storageAvailable()) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getValueAtKey = (key) => {
  if (storageAvailable()) {
    return JSON.parse(localStorage.getItem(key));
  }
};
