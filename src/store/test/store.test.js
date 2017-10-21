import configureStore from '..';

describe('configureStore', () => {
  it('does not throw', () => {
    expect(configureStore).not.toThrow();
  });

  it('returns a redux store', () => {
    const store = configureStore();
    expect(store).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(store.dispatch).toBeDefined();
  });
});
