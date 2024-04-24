const storageLocal = {
  get(key) {
    const value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  delete(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};

const storageSession = {
  get(key) {
    const value = sessionStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  },

  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  delete(key) {
    sessionStorage.removeItem(key);
  },

  clear() {
    sessionStorage.clear();
  }
};

export { storageLocal, storageSession };
