import {
  storageAvailable,
  saveValueAtKey,
  getValueAtKey,
} from '../localStorage';

// A simple mock for localStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

describe('localStorage', () => {
  describe('storageAvailable', () => {
    it('returns true if localStorage exists', () => {
      global.localStorage = new LocalStorageMock();
      expect(storageAvailable()).toBe(true);
    });

    it('returns false if it does not exist', () => {
      global.localStorage = undefined;
      expect(storageAvailable()).toBe(false);
    });
  });

  describe('saveValueAtKey', () => {
    it('returns false if localStorage does not exist', () => {
      global.localStorage = undefined;
      expect(saveValueAtKey()).toBe(false);
    });

    it('returns true if localStorage exists', () => {
      global.localStorage = new LocalStorageMock();
      expect(saveValueAtKey('a', 'b')).toBe(true);
    });

    it('saves a value to localStorage', () => {
      global.localStorage = new LocalStorageMock();
      expect(saveValueAtKey('a', 'b')).toBe(true);
      expect(JSON.parse(localStorage.getItem('a'))).toBe('b');
    });
  });

  describe('getValueAtKey', () => {
    it('returns false if localStorage does not exist', () => {
      global.localStorage = undefined;
      expect(getValueAtKey()).toBe(false);
    });

    it('returns the value if localStorage exists', () => {
      global.localStorage = new LocalStorageMock();
      localStorage.setItem('a', JSON.stringify('b'));
      expect(getValueAtKey('a')).toBe('b');
    });
  });
});
